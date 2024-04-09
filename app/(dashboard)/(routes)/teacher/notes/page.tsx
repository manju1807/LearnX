import React from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const NotesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }

  const notes = await db.notes.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='p-6'>
      <DataTable columns={columns} data={notes} />
    </div>
  );
};

export default NotesPage;
