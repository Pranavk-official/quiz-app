import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type QuestionData = {
  question: string,
  options: string[],
  correctAnswer: number,
};

export async function GET(request: Request) {
  try {
    const questions = await prisma.question.findMany();
    return NextResponse.json(questions);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { question, options, correctAnswer }: QuestionData =
      await request.json();
    const createdQuestion = await prisma.question.create({
      data: {
        question,
        options,
        correctAnswer,
      },
    });
    return NextResponse.json(createdQuestion, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}
