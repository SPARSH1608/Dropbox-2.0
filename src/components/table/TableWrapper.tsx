'use client';
import { FileType } from '@/typing';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DataTable } from './Table';
import { columns } from './columns';
import { useUser } from '@clerk/nextjs';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user?.id);
  const [initialfiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, 'users', user.id, 'files'),
        orderBy('Timestamp', sort)
      )
  );
  // console.log(docs);
  useEffect(() => {
    if (!docs) return;

    const files = docs.docs.map(
      (doc): FileType => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().Timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size,
      })
    );

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={'outline'} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => {
            return (
              <div
                key={file.id}
                className="flex items-center space-x-4 p-5 w-full"
              >
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-full" />
              </div>
            );
          })}
          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        variant={'outline'}
        className="ml-auto w-25"
        onClick={() => setSort(sort === 'desc' ? 'asc' : 'desc')}
      >
        Sort By {sort === 'desc' ? 'Newest' : 'Oldest'}
      </Button>

      <DataTable columns={columns} data={initialfiles} />
    </div>
  );
};

export default TableWrapper;
