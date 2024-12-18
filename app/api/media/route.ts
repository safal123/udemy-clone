import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export async function POST(req: Request) {
 try {
   const {userId} = auth()

   if (!userId) {
     return new NextResponse("Unauthorized", {status: 401})
   }

   const body = await req.json()
   console.log(body)
   const media = await db.media.create({
     data: {
       ...body,
       createdBy: userId,
     }
   })
    return NextResponse.json(media)
 } catch (error) {
    console.error("[MEDIA]", error)
    new NextResponse("Internal Server Error", {status: 500})
 }
}
