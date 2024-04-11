import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='p-6'>
      <div className='pb-0 flex items-center'>
        <h2 className='mr-2 text-xl font-medium tracking-tight'>
          Upload Courses
        </h2>
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
