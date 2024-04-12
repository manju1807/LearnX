import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';
export async function POST(req: Request) {
  try {
    const User = await currentUser();
    const userId = User?.id;
    const Email = User?.emailAddresses[0].emailAddress || '';
    const { categoryId } = await req.json();
    if (!userId) {
      return new NextResponse('Unauthorized Access!', { status: 401 });
    }
    const Test = await db.test.create({
      data: {
        userId,
        Email,
        categoryId,
      },
    });
    return NextResponse.json(Test);
  } catch (error) {
    console.log('{notes API err}', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
