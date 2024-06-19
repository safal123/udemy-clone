'use client'

import Image from 'next/image'
import { Course } from '.prisma/client'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'

interface HomePageCarouselProps {
  courses: Course[],
}

const OPTIONS: EmblaOptionsType = {align: 'end', loop: true}

const HomePageCarousel
  = ({courses}: HomePageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel (OPTIONS, [Autoplay ()])
  return (
    <section className="flex w-full flex-col gap-4 overflow-hidden rounded-xl" ref={ emblaRef }>
      <div className={"flex"}>
        { courses.map ((course) => (
          <figure key={course.id} className={"relative flex h-[500px] aspect-square w-full flex-none cursor-pointer flex-col justify-end rounded-xl border-none"}>
            <Image
              src={ course.imageUri as string }
              alt={ course.title as string }
              fill
              className={"absolute size-full rounded-xl border-none object-cover"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={ 'absolute inset-0 bg-gradient-to-r from-transparent to-black' }>
              <div className={ 'flex flex-col items-center justify-center h-full text-white' }>
                <div className={'w-44'}>
                  <CourseEnrolButton course={ course }/>
                </div>
              </div>
            </div>
          </figure>
        )) }
      </div>
    </section>
  )
}

export default HomePageCarousel
