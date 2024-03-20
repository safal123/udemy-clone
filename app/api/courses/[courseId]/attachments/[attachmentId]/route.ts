import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export async function DELETE(req: Request, {params}: { params: { courseId: string, attachmentId: string } }) {
  try {
    const {userId} = auth()
    const {courseId, attachmentId} = params

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    // Get the course
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId
      },
    })

    // If the course doesn't exist, return an error
    if (!course) {
      return new NextResponse("Internal Server Error", {status: 500})
    }

    // get the attachment
    const attachment = await db.attachment.findUnique({
      where: {
        id: attachmentId
      }
    })

    if (!attachment) {
      return new NextResponse("Internal Server Error", {status: 500})
    }

    // delete the attachment
    await db.attachment.delete({
      where: {
        id: attachmentId
      }
    })

    return new NextResponse("Deleted", {status: 200})

  } catch (error) {
    console.error("[COURSES_ID]", error)
    new NextResponse("Internal Server Error", {status: 500})
  }
}
