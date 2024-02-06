'use client';
import { useAppStore } from '@/store';
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';

import { CopyIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import toast, { Toaster } from 'react-hot-toast';
const RenameModal = () => {
  const { user } = useUser();
  const [input, setInput] = useState('');
  const [isRenameModalOpen, setIsRenameModalOpen] = useAppStore((state) => [
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
  ]);
  const [fileId, setFileId] = useAppStore((state) => [
    state.fileId,
    state.setFileId,
  ]);
  const [filename, setFilename] = useAppStore((state) => [
    state.filename,
    state.setFilename,
  ]);

  const renameFile = async () => {
    if (!user || !fileId) return;
    // console.log('rename', user);

    const toastId = toast.loading('Renaming..');

    await updateDoc(doc(db, 'users', user.id, 'files', fileId), {
      filename: input,
    })
      .then(() => {
        setInput('');
        setIsRenameModalOpen(false);
        toast.success('Renamed Successfully', {
          id: toastId,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something Wrong happened');
      });
  };
  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File</DialogTitle>
        </DialogHeader>
        <Input
          id="link"
          defaultValue={filename}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === 'Enter') {
              renameFile();
            }
          }}
        />
        <div className="flex justify-end space-x-2 py-3">
          <Button
            size="sm"
            className="px-3"
            variant={'ghost'}
            onClick={() => {
              setIsRenameModalOpen(false);
            }}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            size="sm"
            className="px-3"
            onClick={() => {
              renameFile();
            }}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
