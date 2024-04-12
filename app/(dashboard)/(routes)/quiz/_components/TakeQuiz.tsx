import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';
import { db } from '@/lib/db';
import QuizCategory from './category';

const TakeQuiz = async () => {
  const categories = await db.testCategory.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <Card className='hover:cursor-pointer hover:opacity-75 w-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-xl font-semibold'>
          Take a quick Quiz
        </CardTitle>
        <BrainCircuit size={24} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground tracking-tight'>
          Challenge yourself to a quiz with our AI Platform.
        </p>
        <QuizCategory
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </CardContent>
    </Card>
  );
};

export default TakeQuiz;
