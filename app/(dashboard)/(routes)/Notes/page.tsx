import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getNotes } from '@/actions/get-courses';
import { NotesList } from './_components/notesList';
import { NotesCategories } from './_components/categories';
import { SearchInput } from '@/components/search-input';

interface NotesPageProps {
  notesParams: {
    title: string;
    categoryId: string;
  };
}

const NotesPage = async ({ notesParams }: NotesPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }

  const categories = await db.notesCategory.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const notes = await getNotes({
    userId,
    ...notesParams,
  });

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6 space-y-4'>
        <NotesCategories items={categories} />
        <NotesList items={notes} />
      </div>
    </>
  );
};

export default NotesPage;
