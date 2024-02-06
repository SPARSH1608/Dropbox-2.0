import { CardWrapper } from '@/components/Cards';
import { Card } from '@/components/ui/card';
import { UserButton } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const notifications1 = {
  title: 'Essentials',
  desc: '$18 / month',
  titleName: [
    { title: 'User: 1 user' },
    { title: 'Storage: 3 TB of storage' },
    { title: 'Large file delivery: up to 100 GB' },
    { title: 'File restoration: 180 days to restore deleted files' },
    { title: 'File engagement tracking: Track file engagement' },
    { title: 'Signature requests: Unlimited signature requests' },
    { title: 'PDF editing: PDF editing' },
    { title: 'Video editing: Record, review, and edit video' },
  ],
};
const notifications2 = {
  title: 'Business',
  desc: '$20 / user / month',
  titleName: [
    { title: 'Users: 3+ users' },
    { title: 'Storage: Starts at 9 TB for the team' },
    { title: 'Large file delivery: up to 100 GB' },
    { title: 'File restoration: 180 days to restore deleted files' },
    { title: 'File engagement tracking: Track file engagement' },
    { title: 'Signature requests: Unlimited signature requests' },
    { title: 'PDF editing: PDF editing' },
    { title: 'Video editing: Record, review, and edit video' },
    { title: 'Admin setup: Set up admins' },
    { title: 'Content monitoring: Know what content is shared' },
  ],
};
const notifications3 = {
  title: 'Business Plus',
  desc: '$26 / user / month',
  titleName: [
    { title: 'Users: 3+ users' },
    { title: 'Storage: Starts at 15 TB for the team' },
    { title: 'Large file delivery: up to 250 GB' },
    { title: 'File restoration: 1 year to restore deleted files' },
    { title: 'File engagement tracking: Track file engagement' },
    { title: 'Signature requests: Unlimited signature requests' },
    { title: 'PDF editing: PDF editing' },
    { title: 'Video editing: Record, review, and edit video' },
    { title: 'Admin setup: Set up tiered admin roles' },
    { title: 'Suspicious activity alerts: Suspicious activity alerts' },
    { title: 'Compliance tracking: Compliance tracking' },
  ],
};
export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800 ">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Everything you and your business need to work efficiently, all in
            one place
            <br />
          </h1>
          <p className="pb-20">
            Collaborate seamlessly and deliver work faster from anywhere with
            Dropbox. Securely store your content, edit PDFs, share videos, sign
            documents and track file engagement—without leaving Dropbox.
          </p>
          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 p-5 w-fit rounded-2xl"
          >
            Try it for free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-2xl">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser doesnt support the video tag
          </video>
        </div>
      </div>
      <div className="m-10 pt-2 rounded-xl">
        <h1 className="font-bold text-5xl text-center mt-16 ">Plans</h1>
        <div className="flex gap-2 p-5 justify-between w-3/4 mx-auto items-start mt-5">
          <CardWrapper props={notifications1} />
          <CardWrapper props={notifications2} />
          <CardWrapper props={notifications3} />
        </div>
      </div>

      <p className="text-center font-light  text-2xl w-3/4 mx-auto p-5 ">
        Built By{' '}
        <Link
          href="https://github.com/SPARSH1608"
          target="_blank"
          className="text-red-500  underline"
        >
          Sparsh Goel
        </Link>
      </p>
    </main>
  );
}
