'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import { Chapter } from '@prisma/client'
import { Course } from '.prisma/client'
import toast from 'react-hot-toast'
import axios from 'axios'

interface CourseEnrolButtonProps {
  chapter: Chapter & { course: Course }
}

const CourseEnrolButton = ({chapter}: CourseEnrolButtonProps) => {
  const [isLoading, setIsLoading] = useState (false)
  if (!chapter?.course.price) return null
  const handleEnrollment = async () => {
    try {
      setIsLoading (true)
      const response = await axios.post(`/api/courses/${chapter.courseId}/checkout`)
      await window.location.assign(response.data.url)
      toast.success ('You have been enrolled for the course')
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
      className={ 'w-full md:w-auto' }
    >
      Enroll for { formatPrice (chapter?.course?.price) }
    </Button>
  )
}

export default CourseEnrolButton
