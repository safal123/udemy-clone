'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Course } from '.prisma/client'
import AddEditButton from '@/components/shared/AddEditButton'
import { Editor } from '@/components/shared/Editor'
import { Preview } from '@/components/shared/Preview'

interface DescriptionFormProps {
  course: Course,
}

const formSchema = z.object ({
  description: z.string ().min (1, {
    message: 'Description is required'
  })
})

const DescriptionForm = ({course}: DescriptionFormProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)
  const form = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver (formSchema),
    defaultValues: {
      description: course?.description || ''
    }
  })

  const {isSubmitting, isValid, isDirty} = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch (`/api/courses/${ course.id }`, values)
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
        <h2 className={ 'text-xl' }>Description</h2>
        <AddEditButton
          tooltip={ !isEditing ? 'Edit description' : 'Cancel editing' }
          isEditing={isEditing}
          toggleEditing={toggleEditing}
        />
      </div>
      { !isEditing ? <>
          <p className={"text-sm mt-2 font-semibold"}>
            { course.description && <Preview value={ course.description }/> }
          </p>
        </>
        :
        <>
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit (onSubmit) } className={ 'space-y-2 mt-2' }>
              <FormField
                control={ form.control }
                name={ 'description' }
                render={ ({field}) => (
                  <FormItem>
                    <FormControl>
                      <Editor {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                ) }
              />
              <div className={ 'flex items-center gap-x-2' }>
                <Button
                  type={ 'submit' }
                  disabled={ !isValid || isSubmitting || !isDirty }
                  className={ 'flex items-center gap-x-2' }
                >
                  { isSubmitting && <Loader2 className={ 'animate-spin w-4 h-4' }/> }
                  { isSubmitting ? 'Please wait' : 'Save' }
                </Button>
              </div>
            </form>
          </Form>
        </>

      }
    </div>
  )
}

export default DescriptionForm
