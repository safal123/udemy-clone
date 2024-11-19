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

    // if (!course || !course.chapters.length || !course.isPublished) {
    //   redirect('/')
    // }

    // get the query params is Preview mode
    // if (course && course.chapters.length && course.isPublished) {
    //   return redirect(`/courses/${params.courseId}/chapters/${course.chapters[0].id}`)
    // }

    return (
      <>
        <h1>{ course?.title }</h1>
        {JSON.stringify(params)}
      </>
    )
  }

export default CoursePage

