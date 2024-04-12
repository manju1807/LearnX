import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Goal } from 'lucide-react';
type Props = { accuracy: number };

const CorrectnessCard = ({ accuracy }: Props) => {
  accuracy = Math.round(accuracy * 10) / 100;
  return (
    <Card className='md:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-xl font-semibold'>
          Total Right Answers
        </CardTitle>
        <Goal />
      </CardHeader>
      <CardContent>
        <div className='text-sm font-medium'>{accuracy.toString() + '/10'}</div>
      </CardContent>
    </Card>
  );
};

export default CorrectnessCard;
