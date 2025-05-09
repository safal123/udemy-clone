'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import { Course } from '.prisma/client'
import toast from 'react-hot-toast'
import axios from 'axios'
import { CircleCheck, Loader2 } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { ReloadIcon } from "@radix-ui/react-icons"
import { getHasPurchased } from '@/actions/get-has-purchased'

interface CourseEnrolButtonProps {
  course: Course
}

const CourseEnrolButton = ({course}: CourseEnrolButtonProps) => {
  const [isLoading, setIsLoading] = useState (false)
  const {user} = useUser ()
  const router = useRouter ()
  const [hasPurchase, setHasPurchase] = useState(false)

  useEffect (() => {
    const checkPurchase = async () => {
      const {hasPurchased} = await getHasPurchased ({
        courseId: course.id,
        userId: user?.id as string
      })
      setHasPurchase (hasPurchased)
    }
    checkPurchase ()
  }, [course.id, user])

  if (!course.price) return null

  const handleEnrollment = async () => {
    if (!user) {
      toast.error ('You need to login to enroll for the course')
      router.push ('/signin')
      return
    }
    try {
      setIsLoading (true)
      const response = await axios.post (`/api/courses/${ course.id }/checkout`)
      await window.location.assign (response.data.url)
    } catch (error) {
      console.log(error)
      toast.error ('Failed to enroll for the course')
    } finally {
      setIsLoading (false)
    }
  }
  return (
    <Button
      onClick={ handleEnrollment }
      disabled={ isLoading }
      className={ 'w-full' }
    >
      { isLoading ?
        <ReloadIcon className={ 'mr-2 animate-spin' }/> :
        <CircleCheck className={ 'mr-2 h-4 w-4' }/>
      }
      Enroll for { formatPrice (course?.price) }
    </Button>
  )

  // if (hasPurchase) {
  //   return <Link href={'/'}>
  //     <Button>
  //       Visit Course
  //     </Button>
  //   </Link>
  // } else {
  //   return (
  //     <Button
  //       onClick={ handleEnrollment }
  //       disabled={ isLoading }
  //       className={ 'w-full' }
  //     >
  //       { isLoading ?
  //         <ReloadIcon className={ 'mr-2 animate-spin' }/> :
  //         <CircleCheck className={ 'mr-2 h-4 w-4' }/>
  //       }
  //       Enroll for { formatPrice (course?.price) }
  //     </Button>
  //   )
  // }
}

export default CourseEnrolButton
