"use server"

import { db } from '@/lib/db'

interface GetHasPurchasedProps {
  courseId: string
  userId: string
}

export const getHasPurchased = async ({courseId, userId}: GetHasPurchasedProps) => {
  try {
    const hasPurchased = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      }
    })

    return {
      hasPurchased: !!hasPurchased,
    }
  } catch (error) {
    console.error("[GET_HAS_PURCHASED]", error)
    return {
      hasPurchased: false,
      error: "Internal Server Error"
    }
  }
}
