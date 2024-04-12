import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
export async function POST(req: Request) {
  try {
    const User = await currentUser();
    const userId = User?.id;
    const Email = User?.emailAddresses[0].emailAddress || '';
    const { testId, categoryId, accuracy, score, TestDuration } =
      await req.json();
    if (!userId) {
      return new NextResponse('Unauthorized Access!', { status: 401 });
    }
    const testAttempt = await db.testAttempt.create({
      data: {
        testId,
        userId,
        Email,
        categoryId,
        attemptedAt: new Date(),
      },
    });
    const testAttemptId = testAttempt.id;
    const testResults = await db.testResults.create({
      data: {
        testId,
        Email,
        testAttemptId,
        userId,
        TestDuration,
        categoryId,
        accuracy,
        score,
      },
    });
    return NextResponse.json(testResults);
  } catch (error) {
    console.log('{notes API err}', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
