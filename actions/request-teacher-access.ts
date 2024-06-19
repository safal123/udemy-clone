'use server'

import { db } from '@/lib/db'
import { REQUEST_STATUS } from '.prisma/client'

interface RequestTeacherAccessProps {
  userId: string,
  status?: "REQUESTED" | "CANCELLED" | "APPROVED" | "REJECTED"
}

export const hasRequestedTeacherAccess = async ({userId}: RequestTeacherAccessProps) => {
  try {
    const requests = await db.teacherAccessRequest.findMany({
      where: {
        userId,
      }
    })
    return {
      hasRequested: requests.map(request => request.status === "REQUESTED").includes(true),
    }
  } catch (error) {
    console.error("[HAS_REQUESTED_TEACHER_ACCESS]", error)
    return {
      hasRequested: false,
      error: "Cannot check teacher access request at the moment. Please try again later."
    }
  }
}

export const requestTeacherAccess = async ({userId}: RequestTeacherAccessProps) => {
  try {
    const user = await db.user.findUnique ({
      where: {
        userId
      }
    })
    if (!user) {
      return {
        requestAccessSuccess: false,
        error: "User not found"
      }
    }

    const request = await db.teacherAccessRequest.create({
      // @ts-ignore
      data: {
        userId: user.userId,
      }
    })
    return {
      requestAccessSuccess: true,
      message: "Your request has been submitted successfully. It may take up to 24 hours to review your request."
    }
  } catch (error) {
    console.error("[REQUEST_TEACHER_ACCESS]", error)
    return {
      requestAccessSuccess: false,
      error: "Cannot request teacher access at the moment. Please try again later."
    }
  }
}

export const cancelTeacherAccessRequest = async ({userId}: RequestTeacherAccessProps) => {
  try {
    const user = await db.user.findUnique ({
      where: {
        userId
      }
    })
    if (!user) {
      return {
        cancelRequestSuccess: false,
        error: "User not found"
      }
    }

    // find first request with status REQUESTED and update it to CANCELLED
    const request = await db.teacherAccessRequest.updateMany({
      where: {
        userId,
        status: REQUEST_STATUS.REQUESTED
      },
      data: {
        // @ts-ignore
        status: REQUEST_STATUS.CANCELLED_BY_USER
      }
    })

    return {
      cancelRequestSuccess: true,
      message: "Your request has been cancelled successfully."
    }
  } catch (error) {
    console.error("[CANCEL_TEACHER_ACCESS_REQUEST]", error)
    return {
      cancelRequestSuccess: false,
      error: "Cannot cancel teacher access request at the moment. Please try again later."
    }
  }
}
