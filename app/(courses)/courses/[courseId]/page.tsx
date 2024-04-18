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

    return (
      <>
        <h1>{ course.title }</h1>
      </>
    )
  }

export default CoursePage

