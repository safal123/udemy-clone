'use server'

import { db } from '@/lib/db'

interface GetUserProgressProps {
  courseId: string
  userId: string
}

export const getUserProgress = async ({courseId, userId}: GetUserProgressProps) => {
  try {
    const count = await db.userProgress.count ({
      where: {
        userId,
        isCompleted: true,
        chapter: {
          course: {
            id: courseId
          }
        }
      }
    })
    const chaptersCount = await db.chapter.count({
      where: {
        courseId
      },
    })
    
    return Math.round ((count / chaptersCount) * 100)
  } catch (error) {
    console.error("[GET_HAS_PURCHASED]", error)
    return {
      hasPurchased: false,
      error: "Internal Server Error"
    }
  }
}
