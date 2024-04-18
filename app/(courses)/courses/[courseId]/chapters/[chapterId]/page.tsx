import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getChapter } from '@/actions/get-chapters'
import { Banner } from '@/components/shared/Banner'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { getHasPurchased } from '@/actions/get-has-purchased'
import ToggleChapterCompleted
  from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/ToggleChapterCompleted'
import { getChapterIsCompleted } from '@/actions/get-chapter-is-completed'
import { Download, File, LockIcon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import VideoPlayer from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/VideoPlayer'

const ChapterIdPage =
  async ({params}: { params: { courseId: string; chapterId: string } }) => {
    const {userId} = auth ()
    if (!userId) {
      return redirect ('/')
    }

    const {chapter} = await getChapter ({courseId: params.courseId, chapterId: params.chapterId, userId: userId})

    if (!chapter) {
      return redirect ('/')
    }

    const isLocked = !chapter.isFree
    const {hasPurchased} = await getHasPurchased ({userId, courseId: params.courseId})
    const isCompleted = false

    // /courses/05c20586-e576-4345-a1bc-1ee1e714b723

    return (
      <>
        <div className={ 'p-2 max-w-3xl mx-auto' }>
          { isCompleted && <Banner label={ 'You have completed this chapter' } variant={ 'success' }/> }
          { !hasPurchased && isLocked && <Banner label={ 'This chapter is locked' } variant={ 'warning' }/> }
        </div>
        <div className="flex flex-col max-w-3xl px-2 mx-auto">
          <div className="relative">
            { chapter?.muxData && chapter?.muxData.playbackId &&
              <VideoPlayer chapter={ chapter } userId={ userId } isCompleted={ isCompleted as boolean }/> }
            { isLocked && !hasPurchased &&
              <div
                className="z-90 flex flex-col w-full p-12 space-y-12 mx-auto h-full absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-2xl text-white flex">
                  <LockIcon className="h-8 w-8 mr-2"/>
                  Unlock this chapter by enrolling in the course
                </h2>
                <CourseEnrolButton course={ chapter.course }/>
              </div>
            }
          </div>
          <div className={ 'mt-2' }>
            <Card>
              <CardHeader>
                <div className={"flex items-center justify-between"}>
                  { chapter?.title }
                  { !hasPurchased && <CourseEnrolButton course={ chapter.course }/> }
                  { hasPurchased &&
                    <ToggleChapterCompleted
                      chapter={ chapter }
                      isCompleted={ isCompleted as boolean }
                      userId={ userId }/>
                  }
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div className={ 'p-2 max-w-3xl mx-auto' }>
          <Card>
            <CardHeader>
              Course attachments
            </CardHeader>
            <CardContent>
              Attachments for this chapter will be available here.
              { chapter.course.attachments.map ((attachment) => (
                <div key={ attachment.id }
                     className={ 'p-3 flex items-center gap-x-2 mt-2 bg-sky-100 dark:bg-primary dark:text-white border-sky-200 text-sky-700 rounded-md' }>
                  <File className={ 'h-4 w-4' }/>
                  { attachment.name }
                  <Download className={ 'h-4 w-4 ml-auto cursor-pointer' }/>
                </div>
              )) }
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

export default ChapterIdPage
