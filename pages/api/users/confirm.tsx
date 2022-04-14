import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const { token } = req.body;
    const foundToken = await client.token.findUnique({
        where: {
            payload: token,
        },
        //include: {user : true}  // @relation 된 user 데이터를 가져옴
    });
    if (!foundToken) return res.status(404).end();
    req.session.user = {
        id: foundToken?.userId,
    };
    await req.session.save();
    await client.token.deleteMany({
        where: {
            userId: foundToken.userId,
        },
    });
    res.json({ ok: true });
}

//withIronSessionApiRoute 로 감싸줘서 웹사이트에 특정이름의 쿠키를 전달함
// 쿠기를 전달시에 해당 쿠키안에 user 정보가 포함되어 있게 되지만. jwt 처럼 내부 정보를 유저가 확인 할 수 없다는 점이 보안에 더욱 좋다.
export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
        isPrivate: false,
    }),
);
