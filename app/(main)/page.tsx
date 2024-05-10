import { getAllCourses } from '@/actions/get-all-courses'
import { getAllCategories } from '@/actions/get-all-categories'
import CourseCard from '@/components/shared/CourseCard'
import HomePageCarousel from '@/app/(main)/_components/HomePageCarousel'
import { Categories } from '@/app/(dashbaord)/dashboard/search/_components/Categories'

const HomePage = async () => {
  const courses = await getAllCourses () as any[]
  const categories = await getAllCategories () as any[]
  if (!courses) return null

  return (
    <section className="px-4 lg:px-12 py-6">
      <div className={ 'border mb-4 p-2 rounded-md' }>
        <h2 className={ 'text-3xl font-bold mb-6 pt-4' }>Top Categories</h2>
        <Categories
          items={ categories }
        />
      </div>
      <div className="
          relative py-2 px-16 bg-white shadow-md rounded-md
          bg-gradient-to-r from-gray-50 via-gray-500 to-neutral-200
          dark:bg-gradient-to-tr dark:from-slate-900 dark:via-gray-800 dark:to-amber-900
        ">
        <HomePageCarousel courses={ courses }/>
      </div>
      <div className="grid gap-6 items-stretch pt-6 mx-auto md:grid-cols-2 xl:grid-cols-4">
        { courses?.map ((course: any) => (
          <div key={ course.id } className="">
            <CourseCard course={ course }/>
          </div>
        )) }
      </div>
    </section>
  )
}

export default HomePage
