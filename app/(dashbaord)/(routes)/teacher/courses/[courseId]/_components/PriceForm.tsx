'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Course } from '.prisma/client'
import { formatPrice } from '@/lib/format'
import AddEditButton from '@/components/shared/AddEditButton'

interface PriceFormProps {
  initialData: Course,
  courseId: string;
}

const formSchema = z.object ({
  price: z.coerce.number ()
})

const PriceForm = ({initialData, courseId}: PriceFormProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)
  const form = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver (formSchema),
    defaultValues: {
      price: initialData?.price || 0
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
        <h2 className={ 'text-xl' }>Course Price</h2>
        <AddEditButton
          isEditing={ isEditing }
          toggleEditing={ toggleEditing }
          tooltip={ !isEditing ? 'Edit price' : 'Cancel editing' }
        />
      </div>
      { !isEditing ? <>
          <p className={ 'text-sm mt-2 text-theme font-semibold' }>
            { initialData.price ? formatPrice (initialData.price) : 'No price set' }
          </p>
        </>
        :
        <>
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit (onSubmit) } className={ 'space-y-8 mt-8' }>
              <FormField
                control={ form.control }
                name={ 'price' }
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel htmlFor={ 'title' }>Price</FormLabel>
                    <FormControl>
                      <Input
                        type={ 'number' }
                        step={ 0.01 }
                        disabled={ isSubmitting }
                        placeholder={ 'e.g. Set a price for your course...' }
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

export default PriceForm
