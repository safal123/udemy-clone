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
        purchases: {
          none: {
            userId: userId || ''
          }
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUri: true,
        price: true,
        chapters: {
          select: {
            id: true,
            title: true,
            description: true,
            isPublished: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take:4
    })
  } catch (error) {
    console.error ('[GET_ALL_COURSES]', error)
    return {
      error: 'Cannot fetch courses',
      statusCode: 500
    }
  }
}
