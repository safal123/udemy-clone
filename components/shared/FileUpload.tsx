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
        endpoint={ endpoint }
        onClientUploadComplete={ (response) => {
          if (onChange) {
            onChange (response)
          }
        } }
        onUploadError={ (error: Error) => {
          console.error (error.name)
          toast.error ('Images must be less than 4MB')
        } }
      />
    </div>
  )
}

export default FileUpload
