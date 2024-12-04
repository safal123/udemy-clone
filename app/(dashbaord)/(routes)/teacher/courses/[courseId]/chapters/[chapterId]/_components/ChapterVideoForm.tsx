'use client'

import { useEffect, useState } from 'react'
import { Chapter, MuxData } from '@prisma/client'
import Video from 'next-video'
import Title from '@/components/shared/Title'
import UploadVideoToS3
  from '@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/UploadVideoToS3'
import AddEditButton from '@/components/shared/AddEditButton'
import { getObjectFromS3 } from '@/actions/get-object-from-s3'

interface ChapterVideoFormProps {
  chapter: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}


export const ChapterVideoForm = ({chapter, courseId, chapterId}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState (false)
  const toggleEdit = () => setIsEditing ((current) => !current)
  const [videoUrl, setVideoUrl] = useState<string | null> (null)

  const getVideoUrl = async () => {
    if (chapter.videoStorageId) {
      const { objectUrl } = await getObjectFromS3 (chapter.videoStorageId)
      if (objectUrl) setVideoUrl (objectUrl)
    }
  }

  useEffect (() => {
    getVideoUrl ()
  }, [chapter, chapter.videoStorageId])

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-2">
        <Title title={ 'Chapter video' }/>
        <AddEditButton
          isEditing={ isEditing }
          toggleEditing={ toggleEdit }
          mode={ isEditing ? 'add' : 'edit' }
          tooltip={ 'Edit video' }
        />
      </div>
      { !isEditing && videoUrl &&
        <div className="relative aspect-video mt-2">
          <Video
            src={ videoUrl }
            controls
            onError={ getVideoUrl }
            className="w-full h-full"
            style={ {
              aspectRatio: '16/9'
            } }
          />
        </div>
      }

      { isEditing && (
        <div>
          <UploadVideoToS3
            chapterId={ chapterId }
            courseId={ courseId }
            videoStorageId={ chapter.videoStorageId }
            toggleEdit={ toggleEdit }
          />
          <div className="text-xs text-muted-foreground mt-4">
            {videoUrl ? 'Video will be updated after saving' : 'Upload a video to add to this chapter'}
          </div>
        </div>
      ) }
      { chapter?.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if video does not appear.
        </div>
      ) }
    </div>
  )
}
