import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { notesId: string } }
) {
  try {
    const { userId } = auth();
    const { notesId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const notes = await db.notes.update({
      where: {
        id: notesId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(notes);
  } catch (error) {
    console.log('[notes_patch]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
