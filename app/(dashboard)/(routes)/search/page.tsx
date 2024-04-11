import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { SearchInput } from '@/components/search-input';
import { getCourses } from '@/actions/get-courses';
import { CoursesList } from '@/components/courses-list';
import { Categories } from './_components/categories';

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6 space-y-4'>
        <div className='pb-0 flex items-center'>
          <h2 className='mr-2 text-xl font-medium tracking-tight'>
            Find Courses
          </h2>
        </div>
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
