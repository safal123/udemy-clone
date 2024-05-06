'use client'

import { Chapter } from '@prisma/client'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AddEditButton from '@/components/shared/AddEditButton'
import SubmitButton from '@/components/shared/SubmitButton'
import Title from '@/components/shared/Title'

interface ChapterTitleFormProps {
  chapterId: string;
  courseId: string;
  chapter: Chapter
}

const formSchema = z.object ({
  title: z.string ().min (1, {
    message: 'Title is required'
  })
})

const ChapterTitleForm = ({chapterId, courseId, chapter}: ChapterTitleFormProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)
  const form = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver (formSchema),
    defaultValues: {
      title: chapter?.title || ''
    }
  })

  const {isSubmitting, isValid} = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch (`/api/courses/${ courseId }/chapters/${ chapterId }`, values)
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
    <div className={ 'mt-6 border rounded-md p-4' }>
      <div className={ 'font-medium flex items-center justify-between' }>
        <Title title={ 'Chapter title' }/>
        <AddEditButton
          tooltip={ !isEditing ? 'Edit title' : 'Cancel editing' }
          isEditing={ isEditing }
          toggleEditing={ toggleEditing }
        />
      </div>
      { !isEditing ? <>
          <p className={ 'text-sm mt-2 text-slate-500' }>
            { chapter.title }
          </p>
        </>
        :
        <>
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit (onSubmit) } className={ 'space-y-8 mt-8' }>
              <FormField
                control={ form.control }
                name={ 'title' }
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel htmlFor={ 'title' }>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={ isSubmitting }
                        placeholder={ 'e.g. React Hooks Fundamentals' }
                        { ...field }
                      />
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

export default ChapterTitleForm
