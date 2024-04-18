'use client'

import MuxPlayer from '@mux/mux-player-react/lazy'
import { Chapter, MuxData } from '@prisma/client'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type VideoPlayerProps = {
  chapter: Chapter & { muxData?: MuxData | null }
  userId: string | null
  isCompleted: boolean
}

const VideoPlayer = ({chapter, userId, isCompleted}: VideoPlayerProps) => {
  const router = useRouter ()
  if (!chapter?.muxData) {
    return null
  }
  const markAsCompleted = async () => {
    if (isCompleted) return
    try {
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
    }
  }
  return (
    <div className={ 'w-full h-full' }>
      <MuxPlayer
        playbackId={ chapter?.muxData.playbackId || '' }
        loading={ 'viewport' }
        stream-type={ 'on-demand' }
        metadataViewerUserId={ userId || '' }
        onEnded={ markAsCompleted }
        thumbnailTime={ 0 }
        primaryColor={ '#f87315' }
        title={ chapter?.title || '' }
        style={ {
          aspectRatio: 16 / 9
        } }
      />
    </div>
  )
}

export default VideoPlayer
