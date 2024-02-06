'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignedOut, UserButton } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import { ThemeToggler } from './ThemeToggler';

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-3">
        <div className="w-fit">
          {' '}
          <Image
            src="https://www.shareicon.net/data/128x128/2015/10/04/111719_dropbox-icon_512x512.png"
            alt="logo"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-2xl">DropBox</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center text-xl">
        {/* Theme toggler*/}
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
