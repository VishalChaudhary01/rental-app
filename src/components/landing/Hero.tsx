'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export default function HeroSection() {
  return (
    <div className='relative h-[547px] mb-12'>
      <Image
        src='/landing-splash.jpg'
        alt='Rental platform hero section'
        fill
        className='object-cover object-center'
        priority
      />
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black opacity-60'></div>

      {/* Animated Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-6'
      >
        <div className='max-w-4xl mx-auto px-6 sm:px-12'>
          <h1 className='text-h1 text-white'>
            Start your journey to finding the perfect place to call home
          </h1>
          <p className='text-lg md:text-xl text-white mb-8'>
            Explore our wide range of rental properties tailored to fit your
            lifestyle and needs!
          </p>
          <div className='flex items-center justify-center gap-4'>
            <Button variant='outline'>Learn More</Button>
            <Button variant='secondary'>Search Place</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
