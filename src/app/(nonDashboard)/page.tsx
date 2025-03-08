import ActionSection from '@/components/landing/Action';
import DiscoverSection from '@/components/landing/Discover';
import FeaturesSection from '@/components/landing/Features';
import HeroSection from '@/components/landing/Hero';

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col max-w-[1380px] mx-auto'>
      <HeroSection />
      <FeaturesSection />
      <DiscoverSection />
      <ActionSection />
    </div>
  );
}
