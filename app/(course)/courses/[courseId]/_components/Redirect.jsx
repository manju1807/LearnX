'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CircleArrowLeft } from 'lucide-react';
const Redirect = () => {
  const router = useRouter();
  const handleRedirectHome = () => {
    router.push('/');
  };
  return (
    <Button
      size='sm'
      variant='ghost'
      className='p-0 rounded-2xl mb-6'
      onClick={handleRedirectHome}
    >
      <CircleArrowLeft className='h-8 w-8' onClick={handleRedirectHome} />
    </Button>
  );
};

export default Redirect;
