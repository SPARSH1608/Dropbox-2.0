'use client';

import { FileType } from '@/typing';
import { ColumnDef } from '@tanstack/react-table';
import { defaultStyles, FileIcon } from 'react-file-icon';
import prettyBytes from 'pretty-bytes';
import { COLOR_EXTENSION_MAP } from '@/constant';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: 'filename',
    header: 'Filename',
  },
  {
    accessorKey: 'timestamp',
    header: 'Date Added',
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: 'downloadURL',
    header: 'Link',
    cell: ({ renderValue, ...props }) => (
      <a
        href={renderValue() as string}
        target="_blank"
        className="underline text-blue-500 hover:text-blue-600"
      >
        Downlaod
      </a>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split('/')[1];
      //doc/png
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            labelColor={COLOR_EXTENSION_MAP[extension]}
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
];
