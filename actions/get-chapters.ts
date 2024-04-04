"use server"

import { db } from '@/lib/db'

interface GetChapterProps {
  courseId: string
  userId: string
  chapterId: string
}

export const getChapter = async ({courseId, userId, chapterId}: GetChapterProps) => {
  try {
    const chapter = await db.chapter.findFirst({
      where: {
        id: chapterId,
        isPublished: true,
        course: {
          id: courseId,
        }
      },
    })

    return {
      chapter,
    }
  } catch (error) {
    console.error("[GET_CHAPTER]", error)
    return {
      chapter: null,
      error: "Internal Server Error"
    }
  }
}
