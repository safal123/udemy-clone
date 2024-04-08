'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Course } from '.prisma/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AddEditButton from '@/components/shared/AddEditButton'

interface CategoryFormProps {
  initialData: Course
  courseId: string
  options: { label: string; value: string; }[]
}


const formSchema = z.object ({
  categoryId: z.string ().min (1)
})

const CategoryForm = ({initialData, courseId, options}: CategoryFormProps) => {
  const router = useRouter ()
  const [isEditing, setIsEditing] = useState (false)

  const form = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver (formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || ''
    }
  })

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

  const selectedOption = options.find (option => option.value === initialData.categoryId)

  return (
    <div className={ 'mt-6 border bg-slate-100 dark:bg-black rounded-md p-4' }>
      <div className={ 'font-medium flex items-center justify-between' }>
        <h2 className={ 'text-xl' }>Course Category</h2>
        <AddEditButton
          isEditing={ isEditing }
          toggleEditing={ toggleEditing }
          tooltip={ !isEditing ? 'Edit category' : 'Cancel editing' }
        />
      </div>
      { !isEditing ?
        <>
          <p className={ 'text-sm mt-2 text-primary font-semibold' }>
            { selectedOption?.label || 'No category selected' }
          </p>
        </>
        :
        <>
          <Form { ...form }>
            <form
              onSubmit={ form.handleSubmit (onSubmit) }
              className="space-y-4 mt-4"
            >
              <FormField
                control={ form.control }
                name="categoryId"
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel htmlFor="categoryId">Select category...</FormLabel>
                    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select a category"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>

                        { options.map ((option) => (
                          <SelectItem
                            key={ option.value }
                            value={ option.value }
                          >
                            { option.label }
                          </SelectItem>
                        )) }
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                ) }
              />
              <div className="flex items-center gap-x-2">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </>

      }
    </div>
  )
}

export default CategoryForm
