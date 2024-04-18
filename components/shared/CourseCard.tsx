'use client'

import { Category, Course } from '.prisma/client'
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

interface CourseCardProps {
  course: Course & { category: Category }
  isOwner?: boolean
}

const CourseCard = ({course, isOwner}: CourseCardProps) => {
  const router = useRouter ()
  const progress = 50
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
              <p className={ 'text-md md:text-sm font-medium text-slate-700 dark:text-white' }>
                { formatPrice (course?.price) }
              </p> :
              <Badge className={ 'mt-8' }>Free</Badge>
          }
          <CourseProgress
            value={ progress }
            variant={ progress > 0 ? 'success' : 'default' }
            size={ 'sm' }
          />
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
    </Card>
  )
}

export default CourseCard
