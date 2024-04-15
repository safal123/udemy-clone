import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function PATCH (req: Request, {params}: { params: { courseId: string } }) {
  try {
    const {userId} = auth ()
    const {courseId} = params
    const values = await req.json ()

    if (!userId) {
      return new NextResponse ('Unauthorized', {status: 401})
    }

    // Update the course
    const course = await db.course.update ({
      where: {id: courseId, userId},
      data: {...values}
    })
    if (!course) {
      return new NextResponse ('Internal Server Error', {status: 500})
    }
    return NextResponse.json (course)
  } catch (error) {
    console.error ('[COURSES_ID]', error)
    new NextResponse ('Internal Server Error', {status: 500})
  }
}

export async function DELETE (req: Request, {params}: { params: { courseId: string } }) {
  try {
    const {userId} = auth ()

    if (!userId) {
      return new NextResponse ('Unauthorized', {status: 401})
    }

    const course = await db.course.findFirst ({
      where: {
        id: params.courseId,
        userId
      }
    })

    if (!course) {
      return new NextResponse ('Cannot find course', {status: 404})
    }

    await db.course.delete ({
      where: {id: params.courseId}
    })

    return new NextResponse ('Success', {status: 200})
  } catch (error) {
    console.error ('[COURSES]', error)
    new NextResponse ('Internal Server Error', {status: 500})
  }
}
