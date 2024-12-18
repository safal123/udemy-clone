import { getAllImages } from '@/actions/get-all-images'
import Image from 'next/image'
import { formatDateTime, formatImageSize } from '@/lib/format'
import UploadImage from '@/app/(dashbaord)/(routes)/teacher/images/_components/UploadImage'
import { ImagePreviewModal } from '@/app/(dashbaord)/(routes)/teacher/images/_components/ImagePreviewModal'
import { EditImageNameModal } from '@/app/(dashbaord)/(routes)/teacher/images/_components/EditImageNameModal'
import Link from 'next/link'

const VideosPage = async () => {
  const { images } = await getAllImages ()
  const onSubmit = async (values: any) => {
    console.log (values)
  }
  const handelImageDelete = async () => {
    console.log ('Delete Image')
  }
  return (
    <div className={ 'p-4' }>
      <div className={ 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-2' }>
        <div className={ 'dark:border-dotted dark:border-2 dark:border-gray-700 dark:bg-gray-800 p-4 rounded-md h-66' }>
          <UploadImage/>
        </div>
        { images?.map ((image) => (
          <div key={ image.id }>
            <div className={ 'bg-white relative rounded-t-md' }>
              {image.size &&
                <h1 className={ 'text-xs font-medium absolute top-0.5 right-2 bg-gray-800 text-white px-2 py-1 rounded-md' }>
                { formatImageSize(image.size) }
              </h1>}
              { image.course && <h1 className={ 'text-lg font-medium absolute top-0.5 left-2' }>
                <Link href={`/teacher/courses/${ image.course.id }`}
                  className={ 'text-blue-800 hover:underline text-lg font-semibold' }
                >
                  { image.course.title }
                </Link>
              </h1> }
              { image.url &&
                <Image
                  src={ image?.url }
                  width={ 500 }
                  height={ 500 }
                  alt={ image.name }
                  className={ 'w-full h-48 rounded-t-md object-cover' }
                />
              }
              { image.url &&
                <div className={ 'absolute bottom-0.5 right-2 flex gap-2' }>
                  <ImagePreviewModal
                    imageKey={ image.storageId || '' }
                    imageId={ image.id }
                    imageUrl={ image?.url }
                    altText={image.name}
                  />
                </div>
              }
            </div>
            <div className={ 'flex flex-col bg-gray-100 dark:bg-gray-900 px-2 py-3 rounded-b-md' }>
              <div className={ 'flex items-center justify-between' }>
                <h1 className={'truncate text-[12px]'}>
                  { image.name }
                </h1>
                <EditImageNameModal
                  imageKey={ image.storageId || '' }
                  imageId={ image.id }
                  altText={image.name}
                />
              </div>
              <div className={ 'mt-2' }>
                <p className={ 'text-xs text-slate-500' }>
                  { formatDateTime (image.createdAt) }
                </p>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  )
}

export default VideosPage
