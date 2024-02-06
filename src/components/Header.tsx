'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SignedOut, UserButton } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import { ThemeToggler } from './ThemeToggler';

const Header = () => {
  return (
    <header className="flex items-center justify-between my-3 pl-5 pr-8">
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
      <div className="flex items-center space-x-4 text-lg">
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
