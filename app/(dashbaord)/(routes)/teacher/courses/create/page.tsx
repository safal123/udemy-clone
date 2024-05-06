'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ArrowRight } from 'lucide-react'
import { CgClose } from 'react-icons/cg'

const formSchema = z.object ({
  title: z.string ().min (1, {
    message: 'Title is required'
  })
})

const CreateCoursePage = () => {
  const router = useRouter ()
  const form = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver (formSchema),
    defaultValues: {
      title: ''
    }
  })
  const {isSubmitting, isValid} = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post ('/api/courses', values)
      await router.refresh ()
      toast.success ('Course created successfully')
      window.location.replace (`/teacher/courses/${ response.data.id }`)
    } catch (error) {
      toast.error ('Something went wrong')
    }
  }

  return (
    <div className={ 'flex items-center justify-center h-full p-6' }>
      <div className={ 'border p-4 rounded-md w-full' }>
        <h1 className={ 'text-2xl' }>Name your course</h1>
        <p className={ 'text-slate-500 text-sm' }>
          Give your course a name that will help students identify it.
          Don&apos;t worry, you can change this later.
        </p>
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit (onSubmit) } className={ 'space-y-12 mt-8' }>
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
                  <FormDescription>
                    <p className={ 'pt-2' }>
                      What will your course be called?
                    </p>
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              ) }
            />
            <div className={ 'flex items-center justify-between gap-x-2' }>
              <Link href={ '/' }>
                <Button type={ 'button' } variant={ 'outline' }>
                  Cancel
                  <CgClose className={ 'h-4 w-4 ml-2' }/>
                </Button>
              </Link>
              <Button
                type={ 'submit' }
                className={ 'bg-theme hover:bg-theme/90' }
                disabled={ !isValid || isSubmitting }
              >
                { isSubmitting ? 'Creating course...' : 'Create course' }
                <ArrowRight className={ 'h-4 w-4 ml-2' }/>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCoursePage
