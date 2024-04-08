import React from 'react';
import AuthBanner from './_components/AuthBanner';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row items-center justify-center h-screen w-screen'>
      <div className='bg-black flex items-center justify-center h-screen w-1/2'>
        <AuthBanner />
      </div>
      <div className='flex items-center justify-center h-screen w-1/2'>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
