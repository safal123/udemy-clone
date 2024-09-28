"use server"

import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export const checkTeacherRole = async () => {
  try {
    const {userId} = auth ()
    if (!userId) {
      return {
        error: 'User not found',
        statusCode: 404
      }
    }
    const user = await db.user.findUnique ({
      where: {
        userId: userId,
        isTeacher: true
      },
    })

    if (!user) {
      return {
        error: 'User is not a teacher',
        statusCode: 403
      }
    }
    return {
      isTeacher: user.isTeacher
    }
  } catch (error) {
    console.error ('[CHECK_TEACHER_ROLE]', error)
    return {
      error: 'Cannot check teacher role',
      statusCode: 500
    }
  }
}
