import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hourglass } from 'lucide-react';

type Props = {
  ElapsedTime: number;
};

const TimeTakenCard = ({ ElapsedTime }: Props) => {
  return (
    <Card className='md:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-xl font-semibold'>Time Taken</CardTitle>
        <Hourglass />
      </CardHeader>
      <CardContent>
        <div className='text-sm font-medium'>{ElapsedTime} s</div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;
