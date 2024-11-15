"use server"

import { db } from '@/lib/db'

interface GetHasPurchasedProps {
  courseId: string
  userId: string
}

export const getHasPurchased = async ({courseId, userId}: GetHasPurchasedProps) => {
  try {
    if (!userId) {
      return {
        hasPurchased: false,
        error: "Unauthorized"
      }
    }
    const hasPurchased = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId
        }
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
