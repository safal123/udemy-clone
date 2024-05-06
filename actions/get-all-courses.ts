'use server'

import { db } from '@/lib/db'

export const getAllCourses = async () => {
  try {
    return await db.course.findMany ({
      where: {
        isPublished: true
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
      }
    })
  } catch (error) {
    console.error ('[GET_ALL_COURSES]', error)
    return {
      error: 'Cannot fetch courses',
      statusCode: 500
    }
  }
}
