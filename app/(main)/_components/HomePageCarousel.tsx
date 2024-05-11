import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'
import { Course } from '.prisma/client'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'

interface HomePageCarouselProps {
  courses: Course[]
}


const HomePageCarousel
  = ({courses}: HomePageCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent>
        { courses.map ((course, index) => (
          <CarouselItem key={ index }>
            <div className={ 'h-96 gap-4 flex items-center justify-between' }>
              <div className={ 'hidden xl:flex flex-col items-center justify-center flex-1 rounded-lg' }>
                <h1 className={ 'text-4xl text-white font-bold mb-2' }>
                  { course.title }
                </h1>
                <div className={'w-44'}>
                  <CourseEnrolButton course={ course }/>
                </div>
              </div>
              <div className={ 'w-full xl:w-[600px] h-full relative pr-[-20px]' }>
                <Image
                  src={ course?.imageUri as string }
                  alt=""
                  width={ 200 }
                  height={ 250 }
                  className={ 'rounded-md w-full h-96 object-cover' }
                />
                <div className={ 'xl:hidden absolute inset-0 bg-gradient-to-r from-transparent to-black' }>
                  <div className={ 'flex flex-col items-center justify-center h-full text-white' }>
                    <h1 className={ 'text-2xl font-bold mb-2' }>
                      { course.title }
                    </h1>
                    <div className={'w-44'}>
                      <CourseEnrolButton course={ course }/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        )) }
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext/>
    </Carousel>
  )
}

export default HomePageCarousel
