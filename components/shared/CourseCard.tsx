'use client'

import { Category, Course, User } from '.prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardImage } from '@/components/ui/card'
import { Book } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/format'
import { useRouter } from 'next/navigation'
import { FaEdit } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import CourseProgress from '@/components/shared/CourseProgress'
import { useEffect, useState } from 'react'
import { getUserProgress } from '@/actions/get-user-progress'
import { useUser } from '@clerk/nextjs'
import { getHasPurchased } from '@/actions/get-has-purchased'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { Chapter } from '@prisma/client'

interface CourseCardProps {
  course: Course & {
    category: Category,
    chapters: Chapter[],
    author: User
  }
  isOwner?: boolean
}

const CourseCard = ({course, isOwner}: CourseCardProps) => {
  const router = useRouter ()
  const [progress, setProgress] = useState<number> (0)
  const [hasPurchase, setHasPurchase] = useState<boolean> (false)
  const {user} = useUser ()

  useEffect (() => {
    const getProgress = async () => {
      const progress = await getUserProgress ({
        courseId: course.id,
        userId: user?.id as string
      })
      setProgress (progress as number)
    }
    const checkPurchase = async () => {
      const {hasPurchased} = await getHasPurchased ({
        courseId: course.id,
        userId: user?.id as string
      })
      setHasPurchase (hasPurchased)
    }
    checkPurchase ()
    getProgress ()
  }, [course.id, user])

  return (
    <Card>
      <CardHeader>
        <CardImage>
          <Link href={ `/courses/${ course.id }` }>
            { course.imageUri &&
              <Image
                src={ course?.imageUri }
                alt={ course.title || 'Course Image' }
                width={ 100 }
                height={ 50 }
                className={ 'rounded-md w-full h-64 object-cover' }
              />
            }
          </Link>
        </CardImage>
        <CardDescription className={ 'flex flex-col space-y-2 pt-4' }>
          <h3
            className={ 'flex items-center text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2' }>
            <Book className={ 'h-4 w-4 mr-1' }/>
            <span>{ course.title }</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            { course.category?.name }
          </p>
          {
            course?.price ?
              <p
                className={ 'text-md md:text-sm font-medium text-slate-700 dark:text-white flex items-center justify-between' }>
                <span className={ 'font-bold text-lg md:text-base' }>
                  { formatPrice (course?.price) }
                </span>
                <Badge className={ 'ml-12' }>
                  { course.chapters && course?.chapters?.length }
                  { course?.chapters?.length > 1 ? ' Chapters' : ' Chapter' }
                </Badge>
              </p> :
              <>
                <Badge className={ 'mt-8' }>Free</Badge>
              </>
          }

          { user &&
            <CourseProgress
              value={ progress }
              variant={ progress > 0 ? 'success' : 'default' }
              size={ 'sm' }
            /> }
          { course.author &&
            <div className={ 'flex items-center space-x-2' }>
              <Image
                src={ course.author?.imageUri || '/avatar.png' }
                alt={ course.author?.firstName || 'Author Image' }
                width={ 30 }
                height={ 30 }
                className={ 'rounded-full' }
              />
              <Link href={ `/profile/${ course.author?.id }` }>
                <p className={ 'text-xs text-muted-foreground flex flex-col' }>
                <span>
                  Instructor:
                </span>
                  <span className={ 'text-xs dark:text-white underline text-primary' }>
                    { course.author?.firstName } { course.author?.lastName }
                  </span>
                </p>
              </Link>
            </div>
          }
        </CardDescription>
      </CardHeader>

      { isOwner &&
        <CardFooter>
          <Button
            onClick={ () => {
              router.push (`/teacher/courses/${ course.id }`)
            } }
            className="w-full bg-theme hover:bg-theme/80">
            <FaEdit className="mr-2 h-4 w-4"/>
            Edit Course
          </Button>
        </CardFooter>
      }
      { !isOwner && !hasPurchase &&
        <CardFooter>
          <CourseEnrolButton course={ course }/>
        </CardFooter>
      }
      { !isOwner && hasPurchase &&
        <CardFooter>
          <Button
            onClick={ () => router.push (`/courses/${ course.id }`) }
            className="w-full bg-theme hover:bg-theme/80">
            {
              progress > 0 ?
                progress === 100 ?
                  'Completed' :
                  'Continue' :
                'Start'
            }
          </Button>
        </CardFooter>
      }
    </Card>
  )
}

export default CourseCard
