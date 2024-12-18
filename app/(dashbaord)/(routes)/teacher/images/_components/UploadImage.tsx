'use client'

import FileUpload from '@/components/shared/FileUpload'
import axios from 'axios'
import { MediaType } from '.prisma/client'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type UploadImageProps = {
  courseId?: string,
  handleUpload?: (response: any) => void
}

const UploadImage = ({ courseId, handleUpload }: UploadImageProps) => {
  const router = useRouter ()
  const handleChange = async (data: any) => {
    try {
      const response = await axios.post ('/api/media', {
        courseId,
        type: MediaType.IMAGE,
        url: data[0].url,
        mimeType: data[0].mimeType,
        name: data[0].name,
        size: data[0].size,
        storageId: data[0].key
      })
      if (handleUpload) {
        handleUpload (response)
      }
      toast ({
        title: 'Image uploaded',
        description: '🎉 Your image has been uploaded successfully'
      })
      await router.refresh ()
    } catch (error) {
      console.error (error)
      toast ({
        title: 'Error',
        description: 'There was an error uploading the image'
      })
    }
  }
  return (
    <FileUpload
      endpoint={ 'courseImage' }
      onChange={ async (response) => {
        if (response) {
          await handleChange (response)
        }
      } }
    />
  )
}

export default UploadImage
