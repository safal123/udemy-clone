import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

const CoursePage =
  async ({params}: {
    params: {
      courseId: string;
    }
  }) => {

    const course = await db.course.findFirst({
      where: {
        id: params.courseId
      },
      include: {
        chapters: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    if (!course || !course.chapters.length || !course.isPublished) {
      redirect('/')
    }

    await redirect(`/courses/${ params.courseId }/chapters/${ course.chapters[0].id }`)

    return (
      <>
      </>
    )
  }

export default CoursePage

