import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const { phone, email } = req.body;
    const user = phone ? { phone } : email ? { email } : null;
    if (!user) return res.status(400).json({ ok: false });
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    // 아래 토큰을 생성하는데 connectOrCreate 를 통해 User를 찾고 없으면 User를 생성하고 만든 토큰을 연결한다.
    const token = await client.token.create({
        data: {
            payload,
            user: {
                // connect : 다른 테이블과 연결한다. [user 에 생성한 토큰을 연결한다.]
                // connectOrCreate : user가 있으면 연결하고 없으면 유저를 새로 생성하면서 연결한다. [토큰 생성하면서 user 만들기]
                // create : 생성한다. [토큰만 생성]
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: "Anonymous",
                        ...user,
                    },
                },
            },
        },
    });

    console.log(user);
    console.log(token);

    return res.json({
        ok: true,
        key: "value",
    });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
