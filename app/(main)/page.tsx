import { currentUser } from '@clerk/nextjs'
import { getAllCourses } from '@/actions/get-all-courses'
import CourseCard from '@/components/shared/CourseCard'
import { Course } from '.prisma/client'
import HomePageCarousel from '@/app/(main)/_components/HomePageCarousel'

const HomePage = async () => {
  const user = await currentUser()
  const courses = await getAllCourses() as any[]
  if (!courses) return null

  // get images from the first 4 courses
  const images = courses.slice(0, 4).map((course: Course) => {
    return {
      src: course.imageUri,
      alt: course.title,
      title: course.title,
      subtitle: course.description,
      price: course.price
    }
  })

  return (
    <section className="px-4 lg:px-12 py-6">
      <div className="relative py-16 px-16 bg-white shadow-md rounded-md  bg-gradient-to-r from-cyan-900 to-blue-800 dark:from-slate-800 dark:to-slate-900">
        <HomePageCarousel
          images={images as any}
        />
      </div>
      <div className="grid gap-6 items-stretch pt-2 mx-auto md:grid-cols-2 xl:grid-cols-4">
        {courses?.map((course: any) => (
          <div key={course.id} className="">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
