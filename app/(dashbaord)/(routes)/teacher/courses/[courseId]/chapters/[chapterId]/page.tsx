import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'
import React from 'react'
import IconBadge from '@/components/shared/IconBadge'
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react'
import ChapterTitleForm
  from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterTitleForm'
import { Banner } from '@/components/shared/Banner'
import Link from 'next/link'
import ChapterDescriptionForm
  from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterDescriptionFrom'
import {
  ChapterAccessForm
} from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterAccessForm'
import {
  ChapterVideoForm
} from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterVideoForm'
import ChapterActions
  from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/ChapterActions'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const ChapterPage = async ({params}: {
  params: {
    courseId: string;
    chapterId: string;
  }
}) => {
  const {userId} = auth ()
  if (!userId) return

  const chapter = await db.chapter.findUnique ({
    where: {
      id: params.chapterId,
      courseId: params.courseId
    },
    include: {
      muxData: true
    }
  })

  if (!chapter) return

  const requiredFields = [
    chapter.title,
    chapter.videoStorageId
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter (field => field).length
  const completionText = `${ completedFields }/${ totalFields }`
  const completedPercentage = (completedFields / totalFields) * 100

  return (
    <>
      <div className={'p-2'}>
        { !chapter.isPublished && (
          <Banner
            variant="warning"
            label="This chapter is unpublished. It will not be visible in the course"
          />
        ) }
      </div>
      <div className={ 'p-6' }>
        <div className={ 'flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between space-x-2' }>
          <div className="flex items-center justify-between space-x-2 w-full md:w-auto ">
            <h1 className={ 'text-2xl font-medium' }>
              Chapter setup
            </h1>
            <Link
              href={ `/teacher/courses/${ params.courseId }` }
              className="flex items-center text-sm hover:opacity-75 transition"
            >
              <Button variant={ 'link' } className="border">
                <ArrowLeft className="h-4 w-4 mr-2"/>
                Back to course
              </Button>
            </Link>
          </div>
          <ChapterActions
            chapter={ chapter }
            courseId={ chapter.courseId }
            chapterId={ chapter.id }
            isDisabled={ completedPercentage < 100 }
          />
        </div>
        <div className={ 'grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8' }>
          <div>
            <div className={ 'flex bg-accent p-4 rounded-md flex-col md:flex-row md:items-center justify-between' }>
              <div className={ 'flex items-center gap-x-2 w-full' }>
                <IconBadge icon={ LayoutDashboard }/>
                <h2 className={ 'text-xl' }>Customise your chapter</h2>
              </div>
              {/* TODO: Add badge component */ }
            </div>
            <div className={ 'relative' }>
              <Progress value={ completedPercentage } className={ 'mt-4 bg-accent' }/>
              <p className={ cn ('text-sky-100 absolute top-[-0.5px] left-[40%] text-xs') }>
                { Math.round (completedPercentage) }% completed
              </p>
            </div>
            <div>
              <ChapterTitleForm
                chapter={ chapter }
                chapterId={ params.chapterId }
                courseId={ params.courseId }
              />
              <ChapterDescriptionForm
                chapter={ chapter }
                courseId={ params.courseId }
                chapterId={ params.chapterId }
              />
              <div>
                <div className={ 'flex flex-row items-center justify-between mt-4' }>
                  <div className={ 'flex items-center gap-x-2' }>
                    <IconBadge icon={ Eye }/>
                    <h2 className={ 'text-xl' }>Chapter Access</h2>
                  </div>
                </div>
                <ChapterAccessForm
                  chapter={ chapter }
                  courseId={ params.courseId }
                  chapterId={ params.chapterId }
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className={ 'flex flex-row items-center justify-between mt-4' }>
                <div className={ 'flex items-center gap-x-2' }>
                  <IconBadge icon={ Video }/>
                  <h2 className={ 'text-xl' }>Add video content</h2>
                </div>
              </div>
              <ChapterVideoForm
                chapter={ chapter }
                chapterId={ chapter.id }
                courseId={ chapter.courseId }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChapterPage
