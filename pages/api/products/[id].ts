import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const { id } = req.query;
    const product = await client.product.findUnique({
        where: {
            id: +id.toString(),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avatar: true,
                },
            },
        },
    });
    console.log(product);

    const terms = product?.name.split(" ").map((word) => ({
        name: {
            contains: word,
        },
    }));
    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: product?.id,
                },
            },
        },
    });
    console.log(relatedProducts);
    res.json({
        ok: true,
        product,
        relatedProducts,
    });
}
//withIronSessionApiRoute 로 감싸줘서 웹사이트에 특정이름의 쿠키를 전달함
// 쿠기를 전달시에 해당 쿠키안에 user 정보가 포함되어 있게 되지만. jwt 처럼 내부 정보를 유저가 확인 할 수 없다는 점이 보안에 더욱 좋다.
export default withApiSession(
    withHandler({
        methods: ["GET"],
        handler,
    }),
);
