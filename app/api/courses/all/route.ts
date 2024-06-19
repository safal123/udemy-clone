import {NextResponse} from "next/server";
import {db} from "@/lib/db";



export async function GET(
  req: Request,
) {
  try {
    const url = new URL(req.url)
    console.log(req)
    const limit = url.searchParams.get("limit")
    const includes = url.searchParams.get("includes")
    // TODO: add category filter
    const categoryId = url.searchParams.get("categoryId")

    let include = {}

    if (includes) {
      const includesArray = includes.split(",")
      includesArray.forEach(relation => {
        // @ts-ignore
        include[relation] = true
      })
    }

    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        categoryId: categoryId ?? undefined
      },
      orderBy: {
        createdAt: "desc"
      },
      include: include
    })

    if (limit) return NextResponse.json(courses.slice(0, parseInt(limit)))

    return NextResponse.json(courses)
  } catch (error) {
    return new NextResponse("Internal Server Error", {status: 500})
  }
}
