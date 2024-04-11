import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { getAnalytics } from '@/actions/get-analytics';

import { DataCard } from './_components/data-card';
import { Chart } from './_components/chart';

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);

  return (
    <div className='p-6'>
      <div className='pb-6 flex items-center'>
        <h2 className='mr-2 text-xl font-medium tracking-tight'>
          Courses Analytics
        </h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
        <DataCard label='Total Revenue' value={totalRevenue} shouldFormat />
        <DataCard label='Total Sales' value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
