import React from 'react';
import Image from 'next/image';

const AuthBanner = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Image
        src='/LogoWhite.png'
        width={150}
        height={150}
        alt={'LearnX'}
        className='absolute top-5 left-10'
      />
      <div className='text-white text-center flex flex-col justify-center items-center'>
        <h1 className='font-extrabold text-[25px] leading-[35px] sm:text-3xl lg:text-4xl tracking-tight text-center text-white font-Poppins 800px:!leading-[60px] lg:max-w-2xl'>
          Unleash your inner{' '}
          <span className='text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500  bg-clip-text'>
            programming genius
          </span>{' '}
          with our community.
        </h1>
        <p className='text-lg mt-5 font-semibold leading-[24px] text-gray-500 lg:max-w-xl tracking-tight text-center'>
          Empower your programming journey with LearnX dedicated community and
          comprehensive resources.
        </p>
      </div>
    </div>
  );
};

export default AuthBanner;
