"use server"

import { db } from '@/lib/db'

interface GetChapterProps {
  courseId: string
  chapterId: string
}

export const getChapter = async ({courseId, chapterId}: GetChapterProps) => {
  try {
    const chapter = await db.chapter.findFirst({
      where: {
        id: chapterId,
        isPublished: true,
        course: {
          id: courseId,
        }
      },
      include: {
        course: {
          include: {
            attachments: true,
          }
        },
        muxData: true,
      }
    })

    if (!chapter) {
      return {
        chapter: null,
        error: "Chapter not found"
      }
    }

    const nextChapter = await db.chapter.findFirst({
      where: {
        courseId,
        order: chapter.order + 1
      }
    })

    const previousChapter = await db.chapter.findFirst({
      where: {
        courseId,
        order: chapter.order - 1
      }
    })

    return {
      chapter,
      nextChapter,
      previousChapter
    }
  } catch (error) {
    console.error("[GET_CHAPTER]", error)
    return {
      chapter: null,
      error: "Internal Server Error"
    }
  }
}
