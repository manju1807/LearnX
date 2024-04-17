import React from 'react';
import DetailsDialog from '../(root)/_components/detailsDialog';
import QuizCard from './_components/QuizPage';
import HistoryCard from './_components/HistoryCard';
import TakeQuiz from './_components/TakeQuiz';

const QuizDashboardPage = () => {
  return (
    <main className='p-6 mx-auto max-w-full'>
      <div className='flex items-center'>
        <h2 className='mr-2 text-xl font-semibold tracking-tight'>
          Quiz Dashboard
        </h2>
        <DetailsDialog />
      </div>
      <div className='grid gap-4 mt-4 md:grid-cols-2'>
        <QuizCard />
        <HistoryCard />
      </div>
      <div className='grid gap-4 mt-4 md:grid-cols-2'>
        <TakeQuiz />
      </div>
    </main>
  );
};

export default QuizDashboardPage;
