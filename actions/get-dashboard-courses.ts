import { Category } from '.prisma/client'
import { Chapter } from '@prisma/client'
import { db } from '@/lib/db'

type CourseWithProgressWithCategory = {
  category: Category
  chapters: Chapter[]
  progress: number | null
}

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[]
  coursesInProgress: CourseWithProgressWithCategory[]
}

// @ts-ignore
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

    // const courses = purchasedCourses.map ((purchase) => purchase.course) as CourseWithProgressWithCategory[]


  } catch (error) {
    console.error ('[GET_DASHBOARD_COURSES]', error)
    return {
      completedCourses: [],
      coursesInProgress: []
    }
  }
}
