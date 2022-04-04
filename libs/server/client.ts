import { PrismaClient } from "@prisma/client";

declare global {
    var client: PrismaClient | undefined;
}

// 초기 값 global.client 에 아무 값도 없다.
// 처음 시작하면 global 를 prismaClient를 생성한다.
// development 모드일 떄 global.client 에 넣는다.
// 매번 생성하는게 아니고 global.client에 저장한 PrismaClient 를 사용한다.

// prisma는 Node.js에서 사용하는 TypeScripte ORM 이다.

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
