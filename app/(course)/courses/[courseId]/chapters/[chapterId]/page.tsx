import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Video from 'next-video'
import { Separator } from '@/components/ui/separator'
import { getChapter } from '@/actions/get-chapters'
import { Banner } from '@/components/shared/Banner'
import CourseEnrolButton from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { getHasPurchased } from '@/actions/get-has-purchased'
import ToggleChapterCompleted
  from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/ToggleChapterCompleted'
import { getChapterIsCompleted } from '@/actions/get-chapter-is-completed'
import { LockIcon } from 'lucide-react'

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
        <div className="flex flex-col mx-auto max-w-4xl pb-20 pt-3">
          <div className="p-4 relative">
            { chapter?.videoUrl && <Video src={ chapter.videoUrl } controls/> }
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
      </>
    )
  }

export default ChapterIdPage
