"use client"

import MuxPlayer from '@mux/mux-player-react/lazy'
import { Chapter, MuxData } from '@prisma/client'

type VideoPlayerProps = {
  chapter: Chapter & { muxData?: MuxData | null }
  userId: string | null
}

const VideoPlayer = ({ chapter, userId }: VideoPlayerProps) => {
  if (!chapter?.muxData) {
    return null
  }
  return (
      <div className={ 'w-full h-full bg-red-900' }>
        <MuxPlayer
          playbackId={ chapter?.muxData.playbackId || "" }
          loading={'viewport'}
          stream-type={'on-demand'}
          metadataViewerUserId={ userId || "" }
        />
      </div>
  )
}

export default VideoPlayer
