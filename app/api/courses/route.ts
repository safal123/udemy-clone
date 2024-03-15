import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export async function POST(req: Request) {
    try {
        const {userId} = auth()
        const {title} = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        // Create a new course
        const course = await db.course.create({
            data: { title, userId }
        })
        if (!course) {
            return new NextResponse("Internal Server Error", {status: 500})
        }
        return NextResponse.json(course)
    } catch (error) {
        console.error("[COURSES]", error)
        new NextResponse("Internal Server Error", {status: 500})
    }
}