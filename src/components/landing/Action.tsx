'use client';
import { itemVarients } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function ActionSection() {
  return (
    <div className='relative py-24 mb-12'>
      <Image
        src='/landing-call-to-action.jpg'
        alt='action section'
        fill
        className='object-cover object-center'
      />
      <div className='absolute inset-0 bg-black opacity-60'></div>

      <motion.div
        variants={itemVarients}
        className='relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12'
      >
        <div className='flex flex-col md:flex-row items-center md:justify-between justify-center'>
          <h2 className='text-h2 text-start text-white'>
            Find Your Dream Rental Property
          </h2>
          <div className='flex flex-col items-start justify-around'>
            <h4 className='text-h4 text-white mb-4'>
              Discover a wide range of rental properties in your desired
              location.
            </h4>
            <div className='flex items-center justify-center gap-4'>
              <Button variant='outline'>Learn More</Button>
              <Button variant='secondary'>Search Place</Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
