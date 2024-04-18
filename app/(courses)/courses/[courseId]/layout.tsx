import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import CourseSidebar from '@/app/(courses)/courses/[courseId]/_components/CourseSidebar'
import { CourseNavbar } from '@/app/(courses)/courses/[courseId]/_components/CourseNavbar'

interface CourseLayoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  }
}

const CourseLayout =
  async ({children, params}: CourseLayoutProps) => {
    const {userId} = auth ()
    if (!userId) redirect ('/sign-in')

    const course = await db.course.findUnique ({
      where: {
        id: params?.courseId
      },
      include: {
        chapters: {
          where: {
            isPublished: true
          },
          include: {
            userProgress: {
              where: {
                userId
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    if (!course) redirect ('/')

    return (
      <div className={ 'h-full' }>
        <div className={ 'hidden md:flex fixed h-full w-72 flex-col inset-y-0 z-50' }>
          <CourseSidebar course={ course }/>
        </div>
        <main className={ 'md:pl-72 h-full' }>
          <div>
            <CourseNavbar course={ course }/>
          </div>
          { children }
        </main>
      </div>
    )
  }

export default CourseLayout
