import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export async function POST(req: Request, {params}: { params: { courseId: string } }) {
  try {
    const {userId} = auth()
    const {courseId} = params
    const { url } = await req.json()

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

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId,
      }
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.error("[COURSES_ID]", error)
    new NextResponse("Internal Server Error", {status: 500})
  }
}
