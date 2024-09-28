'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Chapter } from '@prisma/client'
import { Editor } from '@/components/shared/Editor'
import { Preview } from '@/components/shared/Preview'
import Title from '@/components/shared/Title'
import AddEditButton from '@/components/shared/AddEditButton'
import SubmitButton from '@/components/shared/SubmitButton'

interface ChapterDescriptionFormProps {
  chapter: Chapter,
  courseId: string;
  chapterId: string;
}

const formSchema = z.object ({
  description: z.string ().min (1, {
    message: 'Description is required'
  })
})

const ChapterDescriptionForm = ({ chapter, courseId, chapterId }: ChapterDescriptionFormProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)
  const form = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver (formSchema),
    defaultValues: {
      description: chapter?.description || ''
    }
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch (`/api/courses/${ courseId }/chapters/${ chapterId }`, values)
      toast.success ('Chapter updated')
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
    <div className={ 'mt-6 border rounded-md p-4' }>
      <div className={ 'font-medium flex items-center justify-between' }>
        <Title title={ 'Chapter Description' }/>
        <AddEditButton
          tooltip={ !isEditing ? 'Edit description' : 'Cancel editing' }
          isEditing={ isEditing }
          toggleEditing={ toggleEditing }
        />
      </div>
      { !isEditing ? <>
          <div className={ 'text-sm mt-2 text-slate-500' }>
            { chapter.description && <Preview value={ chapter.description }/> }
          </div>
        </>
        :
        <>
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit (onSubmit) } className={ 'space-y-8 mt-8' }>
              <FormField
                control={ form.control }
                name={ 'description' }
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={ 'description' }>Description</FormLabel>
                    <FormControl>
                      <Editor { ...field } />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                ) }
              />
              <SubmitButton
                isSubmitting={ isSubmitting }
                savingText={ 'Please wait' }
                defaultText={ 'Save' }
              />
            </form>
          </Form>
        </>
      }
    </div>
  )
}

export default ChapterDescriptionForm
