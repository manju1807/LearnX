import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getNotes } from '@/actions/get-courses';
import { NotesList } from './_components/notesList';
import { NotesCategories } from './_components/categories';
import { NotesSearchInput } from '../../../../components/SearchInput';

interface NotesPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {
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
    ...searchParams,
  });

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <NotesSearchInput />
      </div>
      <div className='p-6 space-y-4'>
        <NotesCategories items={categories} />
        <NotesList items={notes} />
      </div>
    </>
  );
};

export default NotesPage;
