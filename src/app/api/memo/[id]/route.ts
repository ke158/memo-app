import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

// Memoの更新
const PUT = async (req: NextRequest) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const id = req.nextUrl.pathname.split("/").pop();
      const { title } = await req.json();
      const updateMemo = await prisma.memo.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
      return NextResponse.json(
        { updateMemo, message: "更新に成功しました。" },
        { status: 201 }
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error, message: "更新に失敗しました。" },
      { status: 400 }
    );
  }
};

// Memoの削除
const DELETE = async (req: NextRequest) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const id = req.nextUrl.pathname.split("/").pop();
      await prisma.memo.delete({
        where: {
          id,
        },
      });
      return NextResponse.json(
        { message: "削除に成功しました。" },
        { status: 201 }
      );
    });
  } catch (error) {
    return NextResponse.json(
      { error, message: "削除に失敗しました。" },
      { status: 400 }
    );
  }
};

export { PUT, DELETE };
