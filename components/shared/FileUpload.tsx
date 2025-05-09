'use client'

import { UploadDropzone } from '@/lib/uploadThing'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onChange?: (response: any) => void,
  endpoint: keyof typeof ourFileRouter,
}

const FileUpload
  = ({onChange, endpoint}: FileUploadProps) => {
  return (
    <div>
      <UploadDropzone
        className={ 'm-0 w-full sm:h-[275px]' }
        endpoint={ endpoint }
        onClientUploadComplete={ (response) => {
          if (onChange) {
            onChange (response)
          }
        } }
        onUploadError={ (error: Error) => {
          toast.error ('There was an error uploading the file')
        } }
        onBeforeUploadBegin={(files) => {
          // TODO: Add a check for file type
          return files.filter((f) => {
            if (f.size > 10 * 1024 * 1024) {
              toast.error('Images must be less than 10MB');
              return false;
            }
            return true;
          });
        }}
      />
    </div>
  )
}

export default FileUpload
