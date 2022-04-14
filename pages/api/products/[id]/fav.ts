import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const {
        query: { id },
        session: { user },
    } = req;
    console.log(`id : ${id}`);
    console.log(`user : ${user}`);

    // findUnique 는 Unique로 설정된 필드만 사용이 가능하다 때문에
    // findFirst 를 사용한다.
    const alreadyExists = await client.fav.findFirst({
        where: {
            productId: +id.toString(),
            userId: user?.id,
        },
    });

    if (alreadyExists) {
        await client.fav.delete({
            where: {
                id: alreadyExists.id,
            },
        });
    } else {
        await client.fav.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                product: {
                    connect: {
                        id: +id.toString(),
                    },
                },
            },
        });
    }

    res.json({
        ok: true,
    });
}
//withIronSessionApiRoute 로 감싸줘서 웹사이트에 특정이름의 쿠키를 전달함
// 쿠기를 전달시에 해당 쿠키안에 user 정보가 포함되어 있게 되지만. jwt 처럼 내부 정보를 유저가 확인 할 수 없다는 점이 보안에 더욱 좋다.
export default withApiSession(
    withHandler({
        methods: ["POST"],
        handler,
    }),
);
