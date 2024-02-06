'use client';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  doc,
} from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';
const DropzoneComponent = () => {
  const maxSize = 20971520;
  const { isLoaded, isSignedIn, user } = useUser();
  // console.log(user);

  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('File reading was aborted');
      reader.onerror = () => console.log('File reading has failed');
      reader.onload = async () => {
        await uploadPost(file);
        // console.log('Upload');
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);

    const toastId = toast.loading('Uploading...');
    try {
      const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
        userId: user.id,
        filename: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        Timestamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      });

      const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
      const snapshot = await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
        downloadURL: downloadURL,
      });

      toast.success('Uploaded Successfully', {
        id: toastId,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Upload failed. Please try again later.', { id: toastId });
      setLoading(false);
    }
  };

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4 flex flex-row justify-center items-center">
            <div
              {...getRootProps()}
              className={cn(
                'mt-10 w-1/2 h-60 flex justify-center items-center p-5 border-dashed rounded-lg text-center ',
                isDragActive
                  ? 'bg-[#035FFE] text-white animate-pulse'
                  : 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400'
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && <div>Click here or drop a file to upload</div>}
              {isDragActive && !isDragReject && (
                <div>Drop to upload this file</div>
              )}
              {isDragReject && (
                <div className="text-red-600 dark:text-red-700 ml-2">
                  File type not accepted , sorry
                </div>
              )}
              {isFileTooLarge && (
                <div className="text-red-600 dark:text-red-700 ml-2">
                  {' '}
                  File is too large
                </div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
};

export default DropzoneComponent;
