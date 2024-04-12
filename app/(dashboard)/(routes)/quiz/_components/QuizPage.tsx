'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

type Props = {};

const QuizCard = (props: Props) => {
  return (
    <Card className='hover:cursor-pointer hover:opacity-75'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-xl font-semibold'>
          Quiz using LearnX
        </CardTitle>
        <BrainCircuit size={24} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground tracking-tight'>
          Challenge yourself to a quiz with our AI Platform.
        </p>
        <h3 className='font-medium tracking-tight pt-2'>How it works?</h3>
        <p className='text-sm text-muted-foreground tracking-tight'>
          With our AI-powered platform, you can effortlessly select the desired
          category for your assessment and seamlessly commence the quiz.
          It&apos;s as straightforward as that!
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
