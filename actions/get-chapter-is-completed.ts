'use server'

import { db } from '@/lib/db'

interface GetChapterIsCompletedProps {
  courseId: string
  userId: string
  chapterId: string
}

export const getChapterIsCompleted = async ({courseId, userId, chapterId}: GetChapterIsCompletedProps) => {
  try {
    const isCompleted = await db.userProgress.findFirst({
      where: {
        userId,
        chapterId
      },
      select: {
        isCompleted: true
      }
    })

    return {
      isCompleted: isCompleted ? isCompleted.isCompleted : false
    }
  } catch (error) {
    console.error("[GET_CHAPTER_IS_COMPLETED]", error)
    return {
      isCompleted: false,
      error: "Internal Server Error"
    }
  }
}
