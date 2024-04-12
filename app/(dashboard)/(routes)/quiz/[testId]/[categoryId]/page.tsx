import { getQuestions, QuestionWithCategory } from '@/actions/get-questions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';
import MCQQuestions from './_components/quiz';

const TestPage = async ({
  params,
}: {
  params: { testId: string; categoryId: string };
}) => {
  const { testId, categoryId } = params;
  const { userId } = auth();
  let questions: QuestionWithCategory[] = [];

  try {
    if (userId) {
      questions = await getQuestions({ categoryId });
    } else {
      redirect('/');
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
  }

  const Category =
    categoryId === '8aef4199-782f-4325-857c-7be5a385e0e9'
      ? 'JavaScript'
      : 'Data Structures & Algorithms';
  return (
    <div className='p-6'>
      <div className='pb-6'>
        <h1 className='text-bold text-2xl tracking-tight'>{Category} Quiz</h1>
        <p className='text-semibold text-sm text-muted-foreground'>
          All the Best!
        </p>
      </div>
      <MCQQuestions
        questions={questions}
        categoryId={categoryId}
        testId={testId}
      />
    </div>
  );
};

export default TestPage;
