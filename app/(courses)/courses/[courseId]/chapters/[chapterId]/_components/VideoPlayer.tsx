'use client'
import { useEffect, useState } from 'react'
import { Chapter } from '@prisma/client'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Video from 'next-video'
import { Course } from '.prisma/client'
import { getObjectFromS3 } from '@/actions/get-object-from-s3'
import { Loader2 } from 'lucide-react'

type VideoPlayerProps = {
  chapter: Chapter & { course?: Course }
  userId: string | null
  isCompleted: boolean,
  disabled: boolean,
  nextChapter?: Chapter
  hasPurchased: boolean
  isPreviewChapter: boolean
}

const VideoPlayer =
  ({
     chapter,
     userId,
     isCompleted,
     disabled,
     nextChapter,
     hasPurchased,
     isPreviewChapter
   }: VideoPlayerProps) => {
    const router = useRouter ()
    const [isMarkingAsCompleted, setIsMarkingAsCompleted] = useState<boolean> (false)
    const [videoUrl, setVideoUrl] = useState<string | null> (null)

    const getVideoUrl = async () => {
      if (chapter.videoStorageId) {
        try {
          const { objectUrl } = await getObjectFromS3 (chapter.videoStorageId)
          if (objectUrl) {
            setVideoUrl (objectUrl)
          } else {
            console.error ('No object URL received from S3')
          }
        } catch (error) {
          console.error ('Error getting video URL from S3:', error)
        }
      }
    }

    useEffect (() => {
      getVideoUrl ()
    }, [chapter.videoStorageId])

    if (!chapter?.videoStorageId) {
      return null
    }

    const markAsCompletedAtEnd = async () => {
      if (isCompleted) {
        if ((nextChapter && hasPurchased) || nextChapter?.isFree) {
          router.push (`/courses/${ chapter.courseId }/chapters/${ nextChapter.id }`)
        }
        return
      }
      try {
        setIsMarkingAsCompleted (true)
        await axios.patch (`/api/courses/${ chapter.courseId }/chapters/${ chapter.id }/toggleIsCompleted`, {
          isCompleted: true
        })
        await router.refresh ()
        toast ({
          title: 'Chapter marked as completed',
          description: '🎉 You have completed this chapter'
        })
      } catch (e) {
        console.error ('Error marking chapter as complete', e)
      } finally {
        setIsMarkingAsCompleted (false)
      }
    }

    return (
      <div className={ 'w-full md:min-h-[400px]' }>
        { videoUrl ? <Video
            src={ videoUrl }
            controls={ !disabled }
            onError={ getVideoUrl }
            title={ chapter?.title }
            streamType={ 'on-demand' }
            onEnded={ markAsCompletedAtEnd }
            style={ {
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              borderColor: 'transparent',
              overflow: 'hidden'
            } }
            onPlaying={ () => {
              console.log ('Video is playing')
            } }
            autoPlay={ false }
            className={ 'border-4 rounded-md' }
          /> :
          <div className={ 'flex items-center justify-center h-[800px] animate-spin' }>
            <Loader2 size={ 64 } className={ 'text-primary' }/>
          </div>
        }
      </div>
    )
  }

export default VideoPlayer
