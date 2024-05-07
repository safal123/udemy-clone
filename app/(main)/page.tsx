import { currentUser } from '@clerk/nextjs'
import { getAllCourses } from '@/actions/get-all-courses'
import CourseCard from '@/components/shared/CourseCard'
import { Course } from '.prisma/client'

const HomePage = async () => {
  const user = await currentUser()
  const courses = await getAllCourses() as any[]
  if (!courses) return null
  return (
    <section className="lg:px-12">
      <div className={ 'p-6 pt-4 flex items-center justify-between' }>
        <h2 className={ 'text-2xl font-bold text-sky-700' }>
          New Courses
        </h2>
      </div>
      <div className="relative grid gap-6 p-4 mx-auto md:grid-cols-2 lg:grid-cols-3">
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
