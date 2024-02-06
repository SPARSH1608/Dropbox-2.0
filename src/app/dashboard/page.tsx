import React from 'react';
import { auth } from '@clerk/nextjs';

import DropzoneComponent from '@/components/Dropzone';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { FileType } from '@/typing';
import TableWrapper from '@/components/table/TableWrapper';
async function Dashboard() {
  const { userId } = auth();
  //   console.log(userId);
  const docsResult = await getDocs(collection(db, 'users', userId!, 'files'));
  //   console.log('docs', docsResult.docs);
  const skeletonFiles: FileType[] = docsResult.docs.map((doc) => {
    return {
      id: doc.id,
      filename: doc.data().filename || doc.id,
      timestamp: new Date(doc.data().Timestamp?.seconds * 1000) || undefined,
      fullName: doc.data().fullName,
      downloadURL: doc.data().downloadURL,
      type: doc.data().type,
      size: doc.data().size,
    };
  });
  //   console.log(skeletonFiles);
  return (
    <div className="border-t">
      <DropzoneComponent />
      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>
        <div>
          {/* TableWrapper */}
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
