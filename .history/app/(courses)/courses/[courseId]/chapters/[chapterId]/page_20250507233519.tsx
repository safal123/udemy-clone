import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getChapter } from '@/actions/get-chapters'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { getHasPurchased } from '@/actions/get-has-purchased'
import ToggleChapterCompleted
  from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/ToggleChapterCompleted'
import { getChapterIsCompleted } from '@/actions/get-chapter-is-completed'
import { ChevronsLeft, ChevronsRight, Download, File, LockIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import VideoPlayer from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/VideoPlayer'
import Title from '@/components/shared/Title'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Chapter } from '@prisma/client'
import { Preview } from '@/components/shared/Preview'

const ChapterIdPage = async ({ params }: { params: { courseId: string; chapterId: string } }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  }
  const { chapter, nextChapter, previousChapter } = await getChapter({
    courseId: params.courseId,
    chapterId: params.chapterId
  })
  if (!chapter) {
    return redirect('/')
  }
  const isOwner = chapter.course.userId === userId
  const isLocked = !chapter.isFree
  const { hasPurchased } = await getHasPurchased({ userId, courseId: params.courseId })
  // if (!hasPurchased && !isOwner) {
  //   return redirect (`/courses/${ params.courseId }`)
  // }
  const isCompleted = await getChapterIsCompleted({ courseId: params.courseId, userId, chapterId: params.chapterId })

  return (
    <>
      <div className="flex flex-col px-2 mx-auto mt-1">
        <div className="relative">
          {chapter?.videoStorageId && (
            <VideoPlayer
              chapter={chapter}
              userId={userId}
              disabled={isLocked && !hasPurchased && !isOwner}
              isCompleted={isCompleted as boolean}
              nextChapter={nextChapter as Chapter}
              hasPurchased={hasPurchased}
              isPreviewChapter={chapter.isFree}
            />
          )}
          {!isOwner && isLocked && !hasPurchased && (
            <div
              className="z-90 flex flex-col w-full p-12 space-y-12 mx-auto h-full absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="max-w-xl gap-y-4 flex flex-col">
                <h2 className="text-2xl text-white flex">
                  <LockIcon className="h-8 w-8 mr-2" />
                  Unlock this chapter by enrolling in the course
                </h2>
                <CourseEnrolButton course={chapter.course} />
              </div>
            </div>
          )}
        </div>
        <div className="mt-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                {chapter?.title}
                <div className={'flex items-center gap-x-2'}>
                  {!hasPurchased && !isOwner && <CourseEnrolButton course={chapter.course} />}
                  {
                    previousChapter &&
                    <Link href={`/courses/${params.courseId}/chapters/${previousChapter.id}`}>
                      <Button variant="outline">
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                    </Link>
                  }
                  {hasPurchased && !isOwner && (
                    <ToggleChapterCompleted
                      chapter={chapter}
                      isCompleted={isCompleted as boolean}
                      userId={userId}
                    />
                  )}
                  {
                    nextChapter &&
                    <Link href={`/courses/${params.courseId}/chapters/${nextChapter.id}`}>
                      <Button variant="outline">
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  }
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="p-2 w-full mx-auto">
        <Card>
          <CardContent>
            {chapter?.description && <Preview value={chapter?.description} />}
          </CardContent>
          <CardContent>
            <p>
              <Title title="Attachments" />
            </p>
            {chapter.course.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="p-3 flex items-center gap-x-2 mt-2 bg-sky-100 dark:bg-primary dark:text-white border-sky-200 text-sky-700 rounded-md"
              >
                <File className="h-4 w-4" />
                {attachment.name}
                <Download className="h-4 w-4 ml-auto cursor-pointer" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ChapterIdPage
