import React from 'react';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { IconBadge } from '@/components/icon-badge';
import { Banner } from '@/components/banner';
import { File, LayoutDashboard } from 'lucide-react';
import { TitleForm } from './_components/title-form';
import { Actions } from './_components/actions';
import { DescriptionForm } from './_components/description-form';
import { CategoryForm } from './_components/category-form';
import { NotesForm } from './_components/attachment-form';

const NotesIdPage = async ({ params }: { params: { notesId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }
  const notes = await db.notes.findUnique({
    where: {
      id: params.notesId,
    },
  });

  if (!notes) {
    return redirect('/');
  }

  const categories = await db.notesCategory.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const requiredFields = [
    notes.title,
    notes.description,
    notes.docUrl,
    notes.notesCategoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!notes.isPublished && (
        <Banner label='This notes is unpublished. It will not be visible to the students.' />
      )}
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl font-medium'>Notes setup</h1>
            <span className='text-sm text-slate-700'>
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            notesId={params.notesId}
            isPublished={notes.isPublished}
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard} />
              <h2 className='text-xl'>Customize your notes</h2>
            </div>
            <TitleForm initialData={notes} notesId={notes.id} />
            <DescriptionForm initialData={notes} notesId={notes.id} />
            <CategoryForm
              initialData={notes}
              notesId={notes.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={File} />
                <h2 className='text-xl'>Add your notes here!</h2>
              </div>
              <NotesForm initialData={notes} notesId={notes.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesIdPage;
