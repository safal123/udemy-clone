import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import IconBadge from '@/components/shared/IconBadge'
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react'
import TitleForm from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/TitleForm'
import DescriptionFrom from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/DescriptionFrom'
import ImageForm from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/ImageForm'
import CategoryForm from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/CategoryForm'
import PriceForm from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/PriceForm'
import AttachmentForm from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/AttachmentForm'
import ChapterForm from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/ChapterForm'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Banner } from '@/components/shared/Banner'
import { cn } from '@/lib/utils'
import React from 'react'
import axios from 'axios'
import CourseActions from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/CourseActions'
import TooltipButton from '@/components/shared/TooltipButton'


const CoursePage = async ({ params }: {
  params: {
    courseId: string;
  }
}) => {
  const {userId} = auth ()
  if (!userId) redirect ('/sign-in')

  const course = await db.course.findUnique ({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: 'desc'
        }
      },
      chapters: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  })

  if (!course) redirect ('/')

  const categories = await db.category.findMany ({
    orderBy: {
      name: 'asc'
    }
  })

  const requiredFields = [
    course.title,
    course.description,
    course.price,
    course.imageUri,
    course.categoryId,
    course.chapters.some (chapter => chapter.isPublished)
  ]
  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter (field => field).length
  const completionText = `${ completedFields }/${ totalFields } fields completed`
  const completedPercentage = (completedFields / totalFields) * 100

  const handleCoursePublish = async () => {
    if (course.isPublished) {
      await axios.patch (`/api/courses/${ course.id }/unpublish`)
    } else {
      await axios.patch (`/api/courses/${ course.id }/publish`)
    }
  }

  return (
    <>
      <div className={'p-2'}>
        { !course.isPublished && (
          <Banner label="This course is unpublished. It will not be visible to the students."/>
        ) }
      </div>
      <div className={ 'p-6' }>
        <div className={ 'flex items-center justify-between space-x-2' }>
          <h1 className={ 'text-2xl font-bold' }>
            Course setup
          </h1>
          <div className={ 'flex items-center space-x-4' }>
            <CourseActions course={ course } courseId={ params.courseId } isDisabled={ completedPercentage < 100 }/>
          </div>
        </div>
        <div className={ 'grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8' }>
          <div>
            <div className={ 'flex flex-col md:flex-row md:items-center justify-between' }>
              <div className={ 'flex items-center gap-x-2' }>
                <IconBadge icon={ LayoutDashboard }/>
                <h2 className={ 'text-xl font-bold' }>Customise your course</h2>
              </div>
              <div className={"mt-2 md:mt-0 cursor-pointer"}>
                <TooltipButton tooltip={"Complete all fields to publish the course"}>
                  <Badge variant={ 'secondary' }>
                    { completionText }
                  </Badge>
                </TooltipButton>
              </div>
            </div>
            <div className={ 'relative' }>
              <Progress value={ completedPercentage } className={ 'mt-4' }/>
              <p className={ cn ('text-primary absolute top-[-0.5px] left-[40%] text-xs') }>
                { Math.round (completedPercentage) }% completed
              </p>
            </div>
            <div>
              <TitleForm
                initialData={ course }
                courseId={ course.id }
              />
              <DescriptionFrom
                initialData={ course }
                courseId={ course.id }
              />
              <ImageForm initialData={ course } courseId={ course.id }/>
              <CategoryForm
                initialData={ course }
                courseId={ course.id }
                options={ categories.map ((category) => ({
                  label: category.name,
                  value: category.id
                })) }
              />
            </div>
          </div>
          <div className={ 'space-y-6' }>
            <div>
              <div className={ 'flex items-center gap-x-2' }>
                <IconBadge icon={ ListChecks }/>
                <h2 className={ 'text-xl font-bold' }>Course chapters</h2>
              </div>
              <div>
                <ChapterForm
                  initialData={ course }
                  courseId={ course.id }
                />
              </div>
            </div>
            <div>
              <div className={ 'flex items-center gap-x-2' }>
                <IconBadge icon={ CircleDollarSign }/>
                <h2 className={ 'text-xl font-bold' }>Sell your course</h2>
              </div>
              <PriceForm initialData={ course } courseId={ course.id }/>
            </div>
            <div>
              <div className={ 'flex items-center gap-x-2' }>
                <IconBadge icon={ File }/>
                <h2 className={ 'text-xl font-bold' }>
                  Resources &amp; Attachments
                </h2>
              </div>
              <AttachmentForm
                initialData={ course }
                courseId={ course.id }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoursePage
