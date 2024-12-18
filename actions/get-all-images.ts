'use server'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { MediaType } from '.prisma/client'

export const getAllImages = async () => {
  try {
    const {userId} = auth ()
    if (!userId) {
      return {
        error: 'Unauthorized'
      }
    }
    const images = await db.media.findMany ({
      where: {
        createdBy: userId,
        type: MediaType.IMAGE
      },
      include:{
        owner: true,
        course: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return {
      images,
      statusCode: 200
    }
  } catch (error) {
    console.error ('[GET_ALL_COURSES]', error)
    return {
      error: 'Cannot fetch courses',
      statusCode: 500
    }
  }
}
