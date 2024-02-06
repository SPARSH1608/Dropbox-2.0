import { BellIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const data = [
  {
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
  },
  {
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
  },
  {
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
  },
];

export function CardWrapper() {
  return (
    <div className="flex gap-2 p-5 justify-between w-3/4 mx-auto items-start mt-5">
      {data.map((item, index) => (
        <Card key={index} className={cn('w-[380px] bg-[#24242417]')}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.desc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {item.titleName.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
