import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Video from 'next-video'
import { Separator } from '@/components/ui/separator'
import { getChapter } from '@/actions/get-chapters'
import { Banner } from '@/components/shared/Banner'
import CourseEnrolButton from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { db } from '@/lib/db'

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

    const isLocked = chapter?.isFree
    const isCompleted = false
    const hasPurchased = await db.purchase.findFirst ({
      where: {
        userId,
        courseId: params.courseId
      }
    })

    return (
      <>
        <div className={ 'mt-1' }>
          { isCompleted && <Banner label={ 'You have completed this chapter' } variant={ 'success' }/> }
          { isLocked && <Banner label={ 'This chapter is locked' } variant={ 'warning' }/> }
        </div>
        <div className="flex flex-col max-w-4xl mx-auto pb-20 pt-3">
          <div className="p-4">
            { chapter?.videoUrl && <Video src={ chapter.videoUrl } controls/> }
          </div>
          <div>
            <div className="p-4 flex flex-col  md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">
                { chapter?.title }
              </h2>
              {!hasPurchased && <CourseEnrolButton chapter={ chapter }/>}
            </div>
            <Separator/>
          </div>
        </div>
      </>
    )
  }

export default ChapterIdPage
