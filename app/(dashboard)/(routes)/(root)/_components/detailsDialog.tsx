'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Github, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

const DetailsDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className='flex items-center text-xs px-2 py-1 text-white rounded-md bg-slate-800'>
          What is this
          <HelpCircle className='w-4 h-4 ml-1' />
        </span>
      </DialogTrigger>
      <DialogContent className='w-[70vw] max-w-[100vw] md:w-[50vw]'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Welcome to LearnX!</DialogTitle>
          <DialogDescription>
            <div className='flex items-center gap-3 my-2'>
              <p className='flex items-center'>
                <Github className='w-5 h-5' />
                <Link
                  className='ml-1 underline'
                  href='https://github.com/manju1807'
                >
                  GitHub
                </Link>
              </p>
            </div>
            <p className='my-2 mt-4 '>
              Are you tired of mundane and Boring Learning Methods? Say goodbye
              to the ordinary and embrace the extraordinary with LearnX! Our
              platform is revolutionizing the Learning experience by harnessing
              the immense potential of artificial intelligence & latest Tech
              Stack.
            </p>
            <hr />
            <p className='my-2 font-semibold'>
              <h4 className='text-base font-semibold'>Built with</h4>
              <div className='grid justify-around grid-cols-4 mt-2 gap-y-3'>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='planetscale'
                    src='/planetscale.png'
                    width={35}
                    height={35}
                  />
                  <span className=''>Planet Scale</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='nextjs'
                    src='/nextjs.png'
                    width={35}
                    height={35}
                  />
                  <span className=''>Next.js</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='tailwind'
                    src='/tailwind.png'
                    width={35}
                    height={35}
                  />
                  <span className=''>Tailwind</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='clerk-auth'
                    src='/open-uri20230921-22-549wq9.jpg'
                    width={30}
                    height={30}
                  />
                  <span className=''>Clerk Auth</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='openai'
                    src='/openai.png'
                    width={30}
                    height={30}
                  />
                  <span className=''>OpenAI</span>
                </div>

                <div className='flex items-center gap-2'>
                  <Image
                    alt='postgresql'
                    src='/postgresql.png'
                    width={30}
                    height={30}
                  />
                  <span className=''>PostgreSql</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='primsa'
                    src='/prisma.png'
                    width={30}
                    height={30}
                  />
                  <span className=''>Prisma</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Image
                    alt='typescript'
                    src='/typescript.png'
                    width={30}
                    height={30}
                  />
                  <span className=''>TypeScript</span>
                </div>
              </div>
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
