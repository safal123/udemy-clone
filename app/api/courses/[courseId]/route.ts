import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export async function PATCH(req: Request, {params}: { params: { courseId: string } }) {
    try {
        const {userId} = auth()
        const {courseId} = params
        const values = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        // Update the course
        const course = await db.course.update({
            where: {id: courseId, userId},
            data: {...values}
        })
        if (!course) {
            return new NextResponse("Internal Server Error", {status: 500})
        }
        return NextResponse.json(course)
    } catch (error) {
        console.error("[COURSES_ID]", error)
        new NextResponse("Internal Server Error", {status: 500})
    }
}