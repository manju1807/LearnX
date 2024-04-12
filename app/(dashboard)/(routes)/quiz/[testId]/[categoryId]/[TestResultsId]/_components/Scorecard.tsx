import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tally5 } from 'lucide-react';
type Props = { score: number };

const Scorecard = ({ score }: Props) => {
  score = score * 10;
  return (
    <Card className='md:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-xl font-semibold'>
          Total Points Scored
        </CardTitle>
        <Tally5 />
      </CardHeader>
      <CardContent>
        <div className='text-sm font-medium'>
          {score.toString() + ' ' + 'Points'}
        </div>
        <CardDescription className='pb-0'>
          each correct answers carries 10 points*
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default Scorecard;
