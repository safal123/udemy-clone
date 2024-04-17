import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
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
    const {isCompleted} = await getChapterIsCompleted ({courseId: params.courseId, userId, chapterId: params.chapterId})

    return (
      <>
        <div className={ 'p-2' }>
          { isCompleted && <Banner label={ 'You have completed this chapter' } variant={ 'success' }/> }
          { !hasPurchased && isLocked && <Banner label={ 'This chapter is locked' } variant={ 'warning' }/> }
        </div>
        <div className="flex flex-col max-w-3xl px-2">
          <div className="relative">
            { chapter?.videoUrl && <VideoPlayer chapter={ chapter } userId={ userId }/> }
            { isLocked && !hasPurchased &&
              <div className="z-90 h-full absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-2xl text-white flex">
                  <LockIcon className="h-8 w-8 mr-2"/>
                  Unlock this chapter by enrolling in the course
                </h2>
              </div>
            }
          </div>
          <div>
            <div className="p-4 flex flex-col  md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">
                { chapter?.title }
              </h2>
              <div>
                { !hasPurchased && <CourseEnrolButton course={ chapter.course }/> }
                { hasPurchased &&
                  <ToggleChapterCompleted chapter={ chapter } isCompleted={ isCompleted } userId={ userId }/> }
              </div>
            </div>
            <Separator/>
          </div>
        </div>
        <div className={ 'p-2' }>
          <Card className={ 'w-full' }>
            <CardHeader>
              Course attachments
            </CardHeader>
            <CardContent>
              Attachments for this chapter will be available here.
              {chapter.course.attachments.map((attachment) => (
                <div key={attachment.id} className={'p-3 flex items-center gap-x-2 mt-2 bg-sky-100 dark:bg-primary dark:text-white border-sky-200 text-sky-700 rounded-md'}>
                  <File className={'h-4 w-4'}/>
                  {attachment.name}
                  <Download className={'h-4 w-4 ml-auto cursor-pointer'}/>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

export default ChapterIdPage
