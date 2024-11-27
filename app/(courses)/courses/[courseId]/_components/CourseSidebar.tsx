'use server'

import { Course } from '.prisma/client'
import { Chapter, UserProgress } from '@prisma/client'
import { CourseSidebarItem } from '@/app/(courses)/courses/[courseId]/_components/CourseSidebarItem'
import { db } from '@/lib/db'
import { auth, currentUser, UserButton } from '@clerk/nextjs'
import CourseProgress from '@/components/shared/CourseProgress'
import { getUserProgress } from '@/actions/get-user-progress'
import Link from 'next/link'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress?: UserProgress[] | null
    }) []
  },
}

const CourseSidebar = async ({course}: CourseSidebarProps) => {
  const {userId} = auth ()
  const user = await currentUser ()
  const { firstName, lastName } = user || {}
  if (!userId) return null

  const purchase = await db.purchase.findUnique ({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id
      }
    }
  })

  const progress = await getUserProgress ({courseId: course.id, userId})

  return (
    <div className={ 'h-full border-r flex-col overflow-y-auto shadow-sm bg-background' }>
      <div className={ 'h-[73px] flex flex-col border-b items-center justify-center' }>
        <h1 className={ 'font-semibold' }>
          { course.title }
        </h1>
        <Link href={'/'} className={ 'text-primary underline mt-2 text-xs' }>
          Home
        </Link>
      </div>
      { purchase &&
        <CourseProgress
          value={ progress as number }
          variant={ 100 > 0 ? 'success' : 'default' }
          size={ 'default' }
        />
      }
      <div className={ 'flex flex-col w-full gap-1' }>
        { course.chapters.map ((chapter) => (
          <div key={ chapter.id }>
            <CourseSidebarItem
              hasPurchase={ !!purchase }
              key={ chapter.id }
              label={ chapter.title }
              chapterId={ chapter.id }
              isCompleted={ chapter.userProgress ? chapter.userProgress[0]?.isCompleted : false }
              courseId={ course.id }
              isFree={ chapter.isFree }
              isOwner={ course.userId === userId }
            />
          </div>
        )) }
      </div>
      <div className={ 'absolute bottom-0 w-full bg-primary/10 p-2' }>
        <div className={ 'flex items-center gap-2' }>
          <UserButton/>
          <p className={ 'text-xs flex flex-col' }>
            { `${ firstName } ${ lastName }` }
            <span className={ 'text-primary' }>
              { `@${ user?.username }` }
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CourseSidebar
