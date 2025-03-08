'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { featureList } from '@/constants/featureList';
import { containerVarients, itemVarients } from '@/lib/utils';

function FeatureCard({
  title,
  description,
  imgSrc,
  linkText,
  linkHref,
}: IFeatureCardProps) {
  return (
    <div className='text-center'>
      <div className='w-full h-48 rounded-lg flex items-center justify-center p-4'>
        <Image
          src={imgSrc}
          width={400}
          height={400}
          alt={title}
          className='w-full h-full object-contain'
        />
      </div>
      <h4 className='text-h4'>{title}</h4>
      <p className='mb-4 text-center'>{description}</p>
      <Button variant='outline' className='text-primary/90'>
        <Link href={linkHref}>{linkText}</Link>
      </Button>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVarients}
      className='w-full mb-8'
    >
      <motion.h2
        variants={itemVarients}
        className='text-h2 max-w-xl md:max-w-4xl mx-auto'
      >
        Quickly find the Home you want using our effective search filters!
      </motion.h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 py-4 px-8 md:px-4'>
        {featureList.map((feature, index) => (
          <motion.div key={index} variants={itemVarients}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              imgSrc={feature.imageSrc}
              linkText={feature.linkText}
              linkHref={feature.linkHref}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
