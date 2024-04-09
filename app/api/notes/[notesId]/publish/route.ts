import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { notesId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const notes = await db.notes.findUnique({
      where: {
        id: params.notesId,
        userId,
      },
    });

    if (!notes) {
      return new NextResponse('Not found', { status: 404 });
    }

    if (
      !notes.title ||
      !notes.description ||
      !notes.notesCategoryId ||
      !notes.docUrl
    ) {
      return new NextResponse('Missing required fields', { status: 401 });
    }

    const publishedNotes = await db.notes.update({
      where: {
        id: params.notesId,
        userId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedNotes);
  } catch (error) {
    console.log('[Notes_id_publish]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
