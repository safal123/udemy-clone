'use client'
import { useState } from 'react'
import { Chapter, MuxData } from '@prisma/client'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Video from 'next-video'
import { Course } from '.prisma/client'

type VideoPlayerProps = {
  chapter: Chapter & { course?: Course  }
  userId: string | null
  isCompleted: boolean,
  disabled: boolean
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
    <div className={ 'w-full h-full' }>
      <Video
        src={ chapter?.videoUrl }
        controls = { !disabled }
        title={ chapter?.title }
        streamType={ 'on-demand' }
        onEnded={ markAsCompleted }
        style={{
          // make fit for the 100vh-30rem
          aspectRatio: '16 / 9',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}

export default VideoPlayer
