import { db } from '@/lib/db'
import { Course, Purchase } from '.prisma/client'

type PurchaseWithCourse = Purchase &{
  course: Course
}

const groupByCourse = (purchases: PurchaseWithCourse []) => {
  const grouped: { [courseTitle: string]: PurchaseWithCourse [] } = {}

  purchases.forEach(purchase => {
    const courseTitle = purchase.course.title
    // @ts-ignore
    if (!grouped[courseTitle]) {
      // @ts-ignore
      grouped[courseTitle] = 0
    }

    // @ts-ignore
    grouped[courseTitle] += purchase.course.price
  })

  return grouped
}

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId
        }
      },
      include: {
        course: true
      }
    })

    // @ts-ignore
    const totalRevenue = purchases.reduce((acc, purchase) => acc + purchase.course?.price, 0)
    const totalSales = purchases.length
    const data = Object.entries(groupByCourse(purchases)).map(([courseTitle, total]) => ({
     name: courseTitle,
      total: total
    }))

    return {
      totalRevenue,
      totalSales,
      data: data
    }
  } catch (error) {
    console.error('[GET_ANALYTICS]', error)
    return {
      error: 'Cannot fetch analytics',
      statusCode: 500,
      totalRevenue: 0,
      totalSales: 0,
    }
  }
}
