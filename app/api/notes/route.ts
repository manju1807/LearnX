import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';
import { isTeacher } from '@/lib/teacher';
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    if (!userId || !isTeacher(userId)) {
      return new NextResponse('Unauthorized Access!', { status: 401 });
    }
    const notes = await db.notes.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(notes);
  } catch (error) {
    console.log('{notes API err}', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
