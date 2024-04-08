'use client'

import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { CirclePlus, File, Loader2, Pencil, X } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Attachment, Course } from '.prisma/client'
import FileUpload from '@/components/shared/FileUpload'
import AddEditButton from '@/components/shared/AddEditButton'

interface AttachmentProps {
  initialData: Course & { attachments: Attachment[] }
  courseId: string;
}

const formSchema = z.object ({
  url: z.string ().min (1)
})

const AttachmentForm = ({initialData, courseId}: AttachmentProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)
  const [deletingId, setDeletingId] = useState<string | null> (null)


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post (`/api/courses/${ courseId }/attachments`, values)
      toast.success ('Course updated')
      toggleEditing ()
      router.refresh ()
    } catch {
      toast.error ('Something went wrong')
    }
  }

  const onDelete = async (id: string) => {
    setDeletingId (id)
    try {
      await axios.delete (`/api/courses/${ courseId }/attachments/${ id }`)
      toast.success ('Attachment deleted')
      setDeletingId (null)
      router.refresh ()
    } catch {
      toast.error ('Something went wrong')
      setDeletingId (null)
    }
  }

  const toggleEditing = () => {
    setIsEditing ((prev) => !prev)
  }

  return (
    <div className={ 'mt-6 border bg-slate-100 dark:bg-black rounded-md p-4' }>
      <div className={ 'font-medium flex items-center justify-between' }>
        <h2 className={ 'text-xl' }>Course Attachments</h2>
        <AddEditButton
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          tooltip={!isEditing ? 'Add a new attachment' : 'Cancel adding attachment'}
          mode={'add'}
        />
      </div>
      { !isEditing ? <>
          <div className={ 'text-sm mt-2 text-slate-500' }>
            { initialData.attachments.length > 0 ?
              <>
                { initialData.attachments.map ((attachment) => (
                  <div
                    key={ attachment.id }
                    className={ 'p-3 flex items-center gap-x-2 mt-2 bg-sky-100 dark:bg-primary dark:text-white border-sky-200 text-sky-700 rounded-md' }
                  >
                    <File className={ 'h-4 w-4' }/>
                    <p className={ 'text-xs line-clamp-1' }>
                      { attachment.name }
                    </p>
                    { deletingId === attachment.id ?
                      <div className={ 'ml-auto' }>
                        <Loader2 className={ 'h-4 w-4 animate-spin' }/>
                      </div> :
                      <button onClick={ () => onDelete (attachment.id) }
                              className={ 'ml-auto hover:opacity-75 transition' }>
                        <X className={ 'h-4 w-4' }/>
                      </button>

                    }
                  </div>
                )) }
              </>
              :
              <>
              <p className={"text-sm mt-2 text-primary font-semibold"}>
                No attachments
              </p>
              </>
            }
          </div>
        </>
        :
        <>
          <FileUpload
            endpoint={ 'courseAttachment' }
            onChange={ (url) => {
              if (url) {
                onSubmit ({url: url})
              }
            } }/>
          <div className={ 'text-xs text-muted mt-2 text-gray-700 italic font-semibold' }>
            Add any additional files that students may need.
          </div>
        </>

      }
    </div>
  )
}

export default AttachmentForm
