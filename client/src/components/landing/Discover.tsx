'use client';
import { motion } from 'framer-motion';
import { discoverList } from '@/constants/discoverList';
import { containerVarients, itemVarients } from '@/lib/utils';
import Image from 'next/image';

function DiscoverCard({ imgSrc, title, description }: IDiscoverCardProps) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-16 h-16 rounded-full bg-primary/90 p-2 mx-auto flex items-center justify-center mb-4'>
        <Image
          src={imgSrc}
          width={30}
          height={30}
          alt={title}
          className='object-contain'
        />
      </div>
      <h4 className='text-h4'>{title}</h4>
      <p className='mb-4 text-center'>{description}</p>
    </div>
  );
}

export default function DiscoverSection() {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVarients}
      className='w-full mb-8 bg-gray-200 p-4 md:p-8'
    >
      <motion.div
        variants={itemVarients}
        className='max-w-xl md:max-w-4xl mx-auto mb-8'
      >
        <h2 className='text-h2'>Find your Dream Rental Property Today!</h2>
        <p className='text-primary/80 text-center'>
          Searching for your dream rental property has never been easier. With
          our user-friendly search feature, you can quickly find the perfect
          home that meets all your needs. Start your search today and discover
          your dream rental property!
        </p>
      </motion.div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 py-4 px-8 md:px-4'>
        {discoverList.map((discover, index) => (
          <motion.div key={index} variants={itemVarients}>
            <DiscoverCard
              title={discover.title}
              description={discover.description}
              imgSrc={discover.imageSrc}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
