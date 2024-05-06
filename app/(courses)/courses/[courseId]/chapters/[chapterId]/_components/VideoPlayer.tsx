'use client'
import { useState } from 'react'
import { Chapter, MuxData } from '@prisma/client'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import Video from 'next-video'

type VideoPlayerProps = {
  chapter: Chapter & { muxData?: MuxData | null }
  userId: string | null
  isCompleted: boolean
}

const VideoPlayer = ({chapter, userId, isCompleted}: VideoPlayerProps) => {
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
        controls
        title={ chapter?.title }
        streamType={ 'on-demand' }
        onEnded={ markAsCompleted }
        style={ {
          aspectRatio: 16 / 9,
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          padding: '4px'
        } }
      />
    </div>
  )
}

export default VideoPlayer
