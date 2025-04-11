
import { generateUploadButton } from '@uploadthing/react' 
import { generateUploadDropzone } from "@uploadthing/react";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();


import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton  = generateUploadButton<OurFileRouter>();