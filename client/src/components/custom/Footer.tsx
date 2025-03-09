import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function Footer() {
  return (
    <div className='flex flex-col w-full max-w-[1380px] mx-auto gap-4 px-8 py-4'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between mb-4 md:mb-8'>
          <h3 className='text-lg font-bold text-primary/90'>RENTAL APP</h3>
          <ul className='hidden md:flex items-center justify-center gap-4 lg:gap-8 md:font-medium text-primary/80 text-center'>
            <li>About Us</li>
            <li>Cantact Us</li>
            <li>FAQ</li>
            <li>Terms</li>
          </ul>
          <ul className='flex items-center gap-2 md:gap-4 lg:gap-8 md:font-medium text-center text-primary/80'>
            <li>
              <Linkedin />
            </li>
            <li>
              <Github />
            </li>
            <li>
              <Twitter />
            </li>
            <li>
              <Instagram />
            </li>
          </ul>
        </div>
        <ul className='flex md:hidden items-center justify-center gap-4 lg:gap-8 md:font-medium text-primary/80 text-center'>
          <li>About Us</li>
          <li>Cantact Us</li>
          <li>FAQ</li>
          <li>Terms</li>
        </ul>
      </div>
      <Separator />
      <div className='flex items-center justify-center gap-2 md:gap-4 lg:gap-8 md:font-medium text-primary/80 text-center'>
        <p className='font-semibold'>@RENTAL APP. All rights reserved</p>
        <p className='underline'>Privacy Policy</p>
        <p className='underline'>Terms of Service</p>
        <p className='underline'>Cookie Policy</p>
      </div>
    </div>
  );
}
