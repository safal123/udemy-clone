import Link from 'next/link'
import Image from 'next/image'
import { Course, User } from '.prisma/client'

type RecentlyAddedSectionProps = {
  courses: (Course & { author: User })[];
};

export function RecentlyAddedSection ({ courses }: RecentlyAddedSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className={ 'flex justify-between items-center' }>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Recently Added Courses
          </h2>
          <div className="text-lg text-gray-600">
            <Link href={ '/courses' } className={ 'underline text-primary' }>
              View All
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          { courses?.map ((course, index) => (
            <div key={ index } className="relative rounded-lg overflow-hidden shadow-lg group">
              <Image
                src={ course?.imageUri || '/placeholder.jpg' }
                alt={ course?.title || 'Course Image' }
                width={ 500 }
                height={ 300 }
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-end p-4">
                <Link href={ `/courses/${ course.id }` }>
                  <h3
                    className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors duration-300"
                  >
                    { course.title }
                    <span className={ 'block text-sm font-normal underline text-primary mt-1' }>
                    <Image src={ course.author.imageUri || '' } alt={ 'author' } width={ 24 } height={ 24 }
                           className={ 'rounded-full inline-block mr-2' }/>
                      { course.author.firstName }
                  </span>
                  </h3>
                </Link>
              </div>
            </div>
          )) }
        </div>
      </div>
    </section>
  )
}
