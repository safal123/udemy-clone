import React, { useEffect, useRef, useState } from 'react'
import { VideoIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Video from 'next-video'
import { getS3SignedUrl } from '@/actions/get-signed-url'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { getObjectFromS3 } from '@/actions/get-object-from-s3'

interface UploadToS3Props {
  chapterId: string,
  courseId: string,
  toggleEdit: () => void
  videoStorageId: string | null
}

const UploadVideoToS3 = ({ chapterId, courseId, toggleEdit, videoStorageId }: UploadToS3Props) => {
  const router = useRouter ()
  const { toast } = useToast ()
  const [file, setFile] = useState<File | null> (null)
  const [fileUrl, setFileUrl] = useState<string | null> (null)
  const [isUploading, setIsUploading] = useState<boolean> (false)
  const hiddenFileInput = useRef<HTMLInputElement | null> (null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      console.log('File Name:', uploadedFile.name);
      console.log('File Type:', uploadedFile.type);
      console.log('File Size:', uploadedFile.size);
      setFile (uploadedFile)
      // setFileUrl (URL.createObjectURL (uploadedFile))
    }
  }

  const openFileInput = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click ()
    }
  }

  const handleUpload = async () => {
    try {
      if (!file || !chapterId) return
      setIsUploading (true)
      const contentType = file.type
      const { signedUrl, success } = await getS3SignedUrl (chapterId, contentType)
      if (!success) throw new Error ('Failed to get signed url')
      const response = await fetch (signedUrl, {
        method: 'PUT',
        body: file
      })
      if (!response.ok) {
        throw new Error ('Failed to upload video')
      }
      if (!videoStorageId) {
        await axios.patch (`/api/courses/${ courseId }/chapters/${ chapterId }`, {
          videoStorageId: chapterId
        })
      }

      await router.refresh ()
      toggleEdit ()
      toast ({
        variant: 'default',
        title: 'Video uploaded successfully',
        description: 'You can now view the video in the chapter'
      })
    } catch (error) {
      console.error (error)
      toast ({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong',
        description: 'Please try again later, or contact support if the problem persists'
      })
    } finally {
      setIsUploading (false)
    }
  }

  return (
    <div className={ 'flex flex-col items-center justify-center rounded-md' }>
      { fileUrl &&
        <div
          className={ 'flex items-center justify-center rounded-md dark:bg-slate-800' }
        >
          <Video
            src={ fileUrl }
            controls
            className={ 'w-full h-full' }
          />
        </div>
      }
      { !fileUrl &&
        <VideoIcon
          onClick={ openFileInput }
          className={ 'cursor-pointer h-10 w-10 text-slate-500 border border-slate-900 rounded-full dark:border-bg-slate-100 p-2' }
        />
      }
      <div className={ 'flex flex-col mt-6 w-full' }>
        <div className={ 'flex items-center justify-between w-full' }>
          <Button
            onClick={ openFileInput }
            variant={ 'outline' }>
            { fileUrl ? 'Change video' : 'Select video' }
          </Button>

          <Button
            className={ 'ml-auto' }
            disabled={ isUploading || !file }
            onClick={ handleUpload }
            variant={ 'default' }
          >
            { isUploading ? 'Uploading...' : 'Upload' }
          </Button>
        </div>
        <input
          type={ 'file' }
          accept={ 'video/*' }
          hidden={ true }
          ref={ hiddenFileInput }
          onChange={ handleChange }
        />
      </div>
    </div>
  )
}

export default UploadVideoToS3
