'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

type Props = {};

const HistoryCard = (props: Props) => {
  return (
    <Card className='hover:cursor-pointer hover:opacity-75'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-xl font-semibold'>History</CardTitle>
        <BrainCircuit size={24} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>
          Challenge yourself to a quiz with our AI Platform.
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
