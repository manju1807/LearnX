import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { CheckCircle, Clock } from 'lucide-react';

import { getDashboardCourses } from '@/actions/get-dashboard-courses';
import { CoursesList } from '@/components/courses-list';

import { InfoCard } from './_components/info-card';
import DetailsDialog from './_components/detailsDialog';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );

  return (
    <main>
      <div className='p-6 pb-0 flex items-center'>
        <h2 className='mr-2 text-xl font-medium tracking-tight'>
          Student Dashboard
        </h2>
        <DetailsDialog />
      </div>
      <div className='p-6 space-y-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <InfoCard
            icon={Clock}
            label='In Progress'
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label='Completed'
            numberOfItems={completedCourses.length}
            variant='success'
          />
        </div>
        <CoursesList items={[...coursesInProgress, ...completedCourses]} />
      </div>
    </main>
  );
}
