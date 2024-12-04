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
    const allChapters = await db.chapter.findMany({
      where: { courseId, isPublished: true },
      orderBy: { order: 'asc' }
    })
    const currentIndex = allChapters.findIndex(ch => ch.id === chapter.id)
    const nextChapter = allChapters[currentIndex + 1] || null
    const previousChapter = allChapters[currentIndex - 1] || null

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
