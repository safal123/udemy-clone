import Link from 'next/link'
import Image from 'next/image'
import { Course, User } from '.prisma/client'
import { Star, StarHalf, VideoIcon, Videotape } from 'lucide-react'
import { PiArticle } from 'react-icons/pi'
import { BsUniversalAccess } from 'react-icons/bs'
import { RiInstallFill } from 'react-icons/ri'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { Chapter } from '@prisma/client'
import { formatPrice } from '@/lib/format'

type RecentlyAddedSectionProps = {
  courses: (Course & { author: User })[];
};

export function RecentlyAddedSection ({ courses }: RecentlyAddedSectionProps) {
  return (
    <section className="md:px-16 py-12">
      <div className="container mx-auto">
        <div className={ 'flex flex-col md:flex-row justify-between items-center mb-4' }>
          <h2 className="text-2xl md:text-4xl font-bold text-primary">
            Recently Added Courses
          </h2>
          <div className="text-lg text-gray-600 font-bold">
            <Link href={ '/courses' } className={ 'underline text-primary' }>
              View All
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          { courses?.map ((course, index) => (
            <div key={ index }>
              <CourseCard course={ course as Course & { author: User, chapters: Chapter[] } }/>
            </div>
          )) }
        </div>
      </div>
    </section>
  )
}

const CourseCard = ({ course }: {
  course?: Course & {
    author: User ,
    chapters: Chapter[]
  };
}) => {
  return (
    <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full h-48 relative">
        <Link href={`/courses/${course?.id}`}>
          <Image
            height={192}
            width={384}
            src={course?.imageUri || '/placeholder.jpg'}
            alt="Course"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Course Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          {course?.title}
        </h2>

        {/* Rating and Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center">
            <div className="flex space-x-1 text-yellow-400">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={16} />
              ))}
              <StarHalf size={16} />
            </div>
            {/* Rating */}
            <span className="ml-2 text-gray-600 font-medium text-sm">4.2</span>
          </div>
          {/* Price */}
          <span className="text-green-500 bg-green-100/90 rounded-full px-2 py-1 text-[14px]">
            {formatPrice(course?.price || 0)}
          </span>
        </div>

        {/* Course Details */}
        <ul className="mt-4 space-y-2 text-gray-600 text-sm">
          <li className="flex items-center">
            <Videotape size={16} />
            <span className={ 'ml-2' }>
              5 hours on-demand video
            </span>
          </li>
          <li className="flex items-center">
            <PiArticle size={16} />
            <span className={ 'ml-2' }>
              {course?.chapters.length} lectures
            </span>
          </li>
          <li className="flex items-center">
            <BsUniversalAccess size={16} />
            <span className={ 'ml-2' }>
              Full lifetime access
            </span>
          </li>
          <li className="flex items-center">
            <RiInstallFill size={16} />
            <span className={ 'ml-2' }>
              Access on mobile and TV
            </span>
          </li>
        </ul>

        {/* Button */}
        {course?.price && <div className={'my-2'}>
          <CourseEnrolButton course={course} />
        </div>}
      </div>
    </div>
  );
};

export default CourseCard;

