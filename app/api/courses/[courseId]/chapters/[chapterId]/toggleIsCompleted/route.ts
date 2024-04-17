import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db'

export async function PATCH( req: Request, { params }: { params: { courseId: string; chapterId: string } } ) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const chapter = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId: params.chapterId
        }
      },
      create: {
        userId,
        chapterId: params.chapterId,
        isCompleted: isCompleted
      },
      update: {
        isCompleted
      }
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTER_TOGGLE_IS_COMPLETED]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
