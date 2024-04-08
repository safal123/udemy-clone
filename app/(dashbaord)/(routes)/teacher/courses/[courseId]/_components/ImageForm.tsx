'use client'

import * as z from 'zod'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Course } from '.prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/shared/FileUpload'
import AddEditButton from '@/components/shared/AddEditButton'

interface ImageProps {
  initialData: Course,
  courseId: string;
}

const formSchema = z.object ({
  imageUri: z.string ().min (1, {
    message: 'Image is required'
  })
})

const ImageForm = ({initialData, courseId}: ImageProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch (`/api/courses/${ courseId }`, values)
      toast.success ('Course updated')
      toggleEditing ()
      router.refresh ()
    } catch {
      toast.error ('Something went wrong')
    }
  }

  const toggleEditing = () => {
    setIsEditing ((prev) => !prev)
  }

  return (
    <div className={ 'mt-6 border bg-slate-100 dark:bg-black rounded-md p-4' }>
      <div className={ 'font-medium flex items-center justify-between' }>
        <h2 className={ 'text-xl' }>Course Image</h2>
        <AddEditButton
          isEditing={ isEditing }
          toggleEditing={ toggleEditing }
          tooltip={ !isEditing ? 'Edit image' : 'Cancel editing' }
        />
      </div>
      { !isEditing ? <>
          <div className={ 'text-sm mt-2 text-slate-500 dark:bg-black' }>
            { initialData.imageUri && <div className={ 'relative aspect-video mt-2' }>
              <Image
                fill
                src={ initialData.imageUri }
                className={ 'object-cover rounded-md' }
                alt={ 'course_image' }
              />
            </div> }

            { !initialData.imageUri &&
              <>
                <p className={ 'text-primary font-semibold mb-2' }>
                  No image provided
                </p>
                <div className={ 'flex items-center justify-center h-60 bg-slate-200 dark:bg-primary/10 rounded-md' }>
                  <ImageIcon className={ 'h-20 w-20 text-slate-500' }/>
                </div>
              </>
            }
          </div>
        </>
        :
        <>
          <FileUpload
            endpoint={ 'courseImage' }
            onChange={ (url) => {
              if (url) {
                onSubmit ({imageUri: url})
              }
            } }/>
          <div className={ 'text-xs text-muted mt-2' }>
            16:9 aspect ratio recommended
          </div>
        </>

      }
    </div>
  )
}

export default ImageForm
