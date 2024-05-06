'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Chapter } from '@prisma/client'

import { Form, FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import Title from '@/components/shared/Title'
import AddEditButton from '@/components/shared/AddEditButton'
import SubmitButton from '@/components/shared/SubmitButton'

interface ChapterAccessFormProps {
  chapter: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object ({
  isFree: z.boolean ().default (false)
})

export const ChapterAccessForm =
  ({
     chapter,
     courseId,
     chapterId
   }: ChapterAccessFormProps) => {
    const [isEditing, setIsEditing] = useState (false)
    const toggleEdit = () => setIsEditing ((current) => !current)
    const router = useRouter ()

    const form = useForm<z.infer<typeof formSchema>> ({
      resolver: zodResolver (formSchema),
      defaultValues: {
        isFree: !!chapter.isFree
      }
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        await axios.patch (`/api/courses/${ courseId }/chapters/${ chapterId }`, values)
        toast.success ('Chapter access updated')
        toggleEdit ()
        router.refresh ()
      } catch {
        toast.error ('Something went wrong')
      }
    }

    return (
      <div className="mt-6 border rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          <Title title={ 'Chapter Access ' }/>
          <AddEditButton
            tooltip={ !isEditing ? 'Edit access' : 'Cancel editing' }
            isEditing={ isEditing }
            toggleEditing={ toggleEdit }
          />
        </div>
        { !isEditing && (
          <p className={ cn (
            'text-sm mt-2',
            !chapter.isFree && 'text-slate-500 italic'
          ) }>
            { chapter.isFree ? (
              <>This chapter is free for preview.</>
            ) : (
              <>This chapter is not free.</>
            ) }
          </p>
        ) }
        { isEditing && (
          <Form { ...form }>
            <form
              onSubmit={ form.handleSubmit (onSubmit) }
              className="space-y-4 mt-4"
            >
              <FormField
                control={ form.control }
                name="isFree"
                render={ ({field}) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={ field.value }
                        onCheckedChange={ field.onChange }
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormDescription>
                        Check this box if you want to make this chapter free for preview
                      </FormDescription>
                    </div>
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
        ) }
      </div>
    )
  }
