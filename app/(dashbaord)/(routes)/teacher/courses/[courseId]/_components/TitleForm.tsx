'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Course } from '.prisma/client'
import TooltipButton from '@/components/shared/TooltipButton'
import AddEditButton from '@/components/shared/AddEditButton'

interface TitleFormProps {
  initialData: Course,
  courseId: string;
}

const formSchema = z.object ({
  title: z.string ().min (1, {
    message: 'Title is required'
  })
})

const TitleForm = ({initialData, courseId}: TitleFormProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)
  const form = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver (formSchema),
    defaultValues: {
      title: initialData?.title || ''
    }
  })

  const {isSubmitting, isValid} = form.formState

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
        <h2 className={ 'text-xl' }>Course Title</h2>
        <AddEditButton
          tooltip={ !isEditing ? 'Edit title' : 'Cancel editing' }
          isEditing={isEditing}
          toggleEditing={toggleEditing}
        />
      </div>
      { !isEditing ? <>
          <p className={ 'text-sm mt-2 text-primary font-semibold' }>
            { initialData.title }
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
              <div className={ 'flex items-center gap-x-2' }>
                <Button
                  type={ 'submit' }
                  disabled={ !isValid || isSubmitting }
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </>
      }
    </div>
  )
}

export default TitleForm
