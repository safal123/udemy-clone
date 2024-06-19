'use client'
import { useEffect, useState } from 'react'
import { Chapter } from '@prisma/client'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Video from 'next-video'
import { Course } from '.prisma/client'

type VideoPlayerProps = {
  chapter: Chapter & { course?: Course }
  userId: string | null
  isCompleted: boolean,
  disabled: boolean,
}

const VideoPlayer = ({chapter, userId, isCompleted, disabled}: VideoPlayerProps) => {
  const router = useRouter ()
  const [isMarkingAsCompleted, setIsMarkingAsCompleted] = useState<boolean> (false)


  if (!chapter?.videoUrl) {
    return null
  }

  const markAsCompleted = async () => {
    if (isCompleted) return
    try {
      setIsMarkingAsCompleted (true)
      await axios.patch (`/api/courses/${ chapter.courseId }/chapters/${ chapter.id }/toggleIsCompleted`, {
        isCompleted: true
      })
      await router.refresh ()
      toast ({
        title: 'Chapter marked as completed',
        description: 'You have marked this chapter as completed'
      })
    } catch (e) {
      console.error ('Error marking chapter as complete', e)
    } finally {
      setIsMarkingAsCompleted (false)
    }
  }

  return (
    <div className={ 'w-full h-auto rounded-md' }>
      <Video
        src={ chapter?.videoUrl }
        controls={ !disabled }
        title={ chapter?.title }
        streamType={ 'on-demand' }
        onEnded={ markAsCompleted }
        style={ {
          width: '100%',
          height: 'auto',
          // borderRadius: '20px',
        } }
        onPlaying={ () => {
          console.log ('Video is playing')
        } }
        className={"border-4 rounded-md"}
      />
    </div>
  )
}

export default VideoPlayer
