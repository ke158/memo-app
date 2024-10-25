import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

// 全Memoを取得
const GET = async () => {
  try {
    const memos = await prisma.memo.findMany();
    return NextResponse.json(
      { memos, message: "リストの取得に成功しました。" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "リストの取得に失敗しました。" },
      { status: 400 }
    );
  }
};

// Memoの作成
const POST = async (req: NextRequest) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const { title } = await req.json();
      const newMemo = await prisma.memo.create({
        data: {
          title,
        },
      });
      return NextResponse.json(
        { newMemo, message: "作成に成功しました。" },
        { status: 201 }
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error, message: "作成に失敗しました。" },
      { status: 400 }
    );
  }
};

export { GET, POST };
