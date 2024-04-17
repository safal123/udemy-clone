"use server"

import { db } from '@/lib/db'

interface GetUserProgressProps {
  courseId: string
  userId: string
  chapterId: string
}

export const getUserProgress = async ({courseId, userId, chapterId}: GetUserProgressProps) => {
  try {
    const progress = await db.userProgress.findFirst({
      where: {
        userId,
        chapterId
      }
    })
  } catch (error) {
    console.error("[GET_HAS_PURCHASED]", error)
    return {
      hasPurchased: false,
      error: "Internal Server Error"
    }
  }
}
