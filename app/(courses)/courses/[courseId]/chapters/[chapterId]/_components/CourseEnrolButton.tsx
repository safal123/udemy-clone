'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import { Course } from '.prisma/client'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Check, DollarSign, Loader2 } from 'lucide-react'

interface CourseEnrolButtonProps {
  course: Course
}

const CourseEnrolButton = ({course}: CourseEnrolButtonProps) => {
  const [isLoading, setIsLoading] = useState (false)
  if (!course.price) return null

  const handleEnrollment = async () => {
    try {
      setIsLoading (true)
      const response = await axios.post(`/api/courses/${course.id}/checkout`)
      await window.location.assign(response.data.url)
    } catch (error) {
      console.error (error)
      toast.error ('Failed to enroll for the course')
    } finally {
      setIsLoading (false)
    }
  }
  return (
    <Button
      onClick={ handleEnrollment }
      disabled={ isLoading}
      className={ 'w-full' }
    >
      { isLoading ? <Loader2 className={ 'mr-2 animate-spin' }/> : <Check className={ 'mr-2 h-4 w-4' }/> }
      Enroll for { formatPrice (course?.price) }
    </Button>
  )
}

export default CourseEnrolButton
