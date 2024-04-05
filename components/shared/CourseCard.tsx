'use client'

import { Category, Course } from '.prisma/client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardImage } from '@/components/ui/card'
import { Book, BookAIcon, CheckIcon } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/lib/format'
import { useRouter } from 'next/navigation'
import { FaEdit } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface CourseCardProps {
  course: Course & { category: Category }
  isOwner?: boolean
}

const CourseCard = ({course, isOwner}: CourseCardProps) => {
  const router = useRouter ()
  return (
    <Card>
      <CardHeader>
        <CardImage>
          <Link href={`/courses/${course.id}`}>
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
        <CardDescription className={ 'flex flex-col' }>
          <h3 className={ 'font-bold text-lg text-theme flex items-center' }>
            <Book className={ 'h-4 w-4 mr-2' }/>
            { course.title }
          </h3>
          <div className={ 'mt-2 inline-block' }>
            <Badge>
              { course?.category?.name }
            </Badge>
          </div>
          {
            course?.price ?
              <span className={ 'font-bold text-theme mt-2 text-xl' }>
                { formatPrice (course?.price) }
              </span> :
              <Badge className={ 'mt-4' }>Free</Badge>
          }
        </CardDescription>
      </CardHeader>
      <CardFooter>
        { isOwner ?
          <Button
            onClick={ () => {
              router.push (`/teacher/courses/${ course.id }`)
            } }
            className="w-full bg-theme hover:bg-theme/80">
            <FaEdit className="mr-2 h-4 w-4"/>
            Edit Course
          </Button>
          :
          <Button className="w-full bg-theme hover:bg-theme/80">
            <CheckIcon className="mr-2 h-4 w-4"/>
            Enroll Now
          </Button> }
      </CardFooter>
    </Card>
  )
}

export default CourseCard
