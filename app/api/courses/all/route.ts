import {NextResponse} from "next/server";
import {db} from "@/lib/db";


export async function GET(req: Request) {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: "desc"
      },
    })
    return NextResponse.json(courses)
  } catch (error) {
    console.error("[COURSES]", error)
    new NextResponse("Internal Server Error", {status: 500})
  }
}
