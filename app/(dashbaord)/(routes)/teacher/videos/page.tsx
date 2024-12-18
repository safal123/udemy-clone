import { getAllVideosFromS3 } from '@/actions/get-all-videos-from-s3'
import { getObjectFromS3 } from '@/actions/get-object-from-s3'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'

const VideosPage = async () => {
  const { videos } = await getAllVideosFromS3 ()
  return (
    <div className={ 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' }>
      { videos?.map ((video) => {
        return (
          <div key={ video.Key }>
            <VideoPlayer objectId={ video.Key as string }/>
          </div>
        )
      }) }
    </div>
  )
}

export default VideosPage

const VideoPlayer = async ({ objectId }: {
  objectId: string
}) => {
  const { objectUrl, metadata } = await getObjectFromS3 (objectId)
  console.log ('Meta data', metadata)
  return (
    <div className={ 'bg-white p-4 rounded-md shadow-sm relative' }>
      <video
        className={ 'w-full h-48' }
        autoPlay={false}
        controls>
        <source
          src={ objectUrl }
          type="video/mp4"
        />
      </video>
      <div className={ 'absolute bottom-4 right-4' }>
        <Button
          size={ 'sm' }
        >
          <TrashIcon className={ 'w-4 h-4' }/>
        </Button>
      </div>
      <pre>
        { JSON.stringify (metadata) }
      </pre>
    </div>
  )
}
