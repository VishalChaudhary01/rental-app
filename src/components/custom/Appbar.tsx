import Link from 'next/link';
import { Button } from '../ui/button';

export default function Appbar() {
  return (
    <div className='w-full z-50 shadow-md max-w-[1380px] mx-auto bg-primary/90'>
      <div className='flex items-center justify-between px-8 py-2'>
        <Link href={'/'} className='text-lg font-bold text-secondary'>
          Rental-App
        </Link>
        <div className='flex items-center justify-center gap-4 text-secondary'>
          <Button variant='outline'>
            <Link href={'/signin'}>Signin</Link>
          </Button>
          <Button variant='secondary'>
            <Link href={'/signup'}>Signup</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
