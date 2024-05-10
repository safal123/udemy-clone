import { Category, Course } from '.prisma/client'
import { Chapter } from '@prisma/client'
import { db } from '@/lib/db'
import { getUserProgress } from '@/actions/get-user-progress'

type CourseWithProgressWithCategory = Course & {
  category: Category
  chapters: Chapter[]
  progress: number | null
}

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[]
  coursesInProgress: CourseWithProgressWithCategory[]
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await db.purchase.findMany ({
      where: {
        userId
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true
              },
            },
          }
        }
      }
    })

    const courses = purchasedCourses.map (purchasedCourse => purchasedCourse.course) as CourseWithProgressWithCategory[]

    for (let course of courses) {
      // @ts-ignore
      course['progress'] = await getUserProgress ({
        courseId: course.id,
        userId
      })
    }

    const completedCourses = courses.filter (course => (course.progress ?? 0) === 100)
    const coursesInProgress = courses.filter (course => (course.progress ?? 0) < 100)

    return {
      completedCourses,
      coursesInProgress
    }
  } catch (error) {
    console.error ('[GET_DASHBOARD_COURSES]', error)
    return {
      completedCourses: [],
      coursesInProgress: []
    }
  }
}
