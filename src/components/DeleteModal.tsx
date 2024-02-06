'use client';
import { CopyIcon } from '@radix-ui/react-icons';

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
import { useAppStore } from '@/store';
import { useUser } from '@clerk/nextjs';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
export function DeleteModal() {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
  ]);
  const [fileId, setFileId] = useAppStore((state) => [
    state.fileId,
    state.setFileId,
  ]);
  async function deleteFile() {
    if (!user || !fileId) return;

    const toastId = toast.loading('Deleting..');

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef)
        .then(async () => {
          deleteDoc(doc(db, 'users', user.id, 'files', fileId)).then(() => {
            // console.log('file deleted successfully');
            toast.success('Deleted Successfully', {
              id: toastId,
            });
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      // console.log(error);
      toast.error('Something went wrong', {
        id: toastId,
      });
      setIsDeleteModalOpen(false);
    }
    setIsDeleteModalOpen(false);
  }
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This Action cannot be undone. This will permanantly delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={'ghost'}
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
          >
            <span className="sr-only">Cancel</span>
            <span>cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            variant={'destructive'}
            className="px-3 flex-1"
            onClick={() => {
              deleteFile();
            }}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
