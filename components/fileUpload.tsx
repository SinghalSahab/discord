import React from 'react'

import { UploadDropzone } from '@/lib/uploadthing';
import type { ClientUploadedFileData } from "uploadthing/types";
import { X } from 'lucide-react';
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
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const fileUrl = res?.[0]?.ufsUrl;
  if (fileUrl) onChange(fileUrl);
      }}
      onUploadError={(error: Error) => console.error(error.message)}
    />
  )
}

export default FileUpload