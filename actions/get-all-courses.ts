'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'

export const getAllCourses = async () => {
  try {
    const {userId} = auth ()
    return await db.course.findMany ({
      where: {
        isPublished: true,
        // exclude courses that the user has already purchased
        // TODO: need to revisit this logic
        // purchases: {
        //   none: {
        //     userId: userId || ''
        //   }
        // },
      },
      include: {
        chapters: true,
        author: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take:3
    })
  } catch (error) {
    console.error ('[GET_ALL_COURSES]', error)
    return {
      error: 'Cannot fetch courses',
      statusCode: 500
    }
  }
}
