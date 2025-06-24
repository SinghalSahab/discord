"use client";

import { UploadDropzone } from '@/lib/uploadthing';
import type { ClientUploadedFileData } from "uploadthing/types";
import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';
import "@uploadthing/react/styles.css"; 
import { on } from 'events';

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
  }

  
const FileUpload = ({
    onChange,
    value,
    endpoint
  }: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if(value && fileType!== "pdf") {
        return (
            <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
        )
    }

    if (value && fileType === "pdf") {
      return (
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
          <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            {value}
          </a>
          <button
            onClick={() => onChange("")}
            className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      );
    }
  
  return (
    <UploadDropzone
  endpoint={endpoint}
  className="w-full max-w-sm mx-auto"
  onClientUploadComplete={(res) => {
    const fileUrl = res?.[0]?.ufsUrl;
    if (fileUrl) onChange(fileUrl);
  }}
  onUploadError={(error: Error) => console.error(error.message)}
/>

  )
}

export default FileUpload