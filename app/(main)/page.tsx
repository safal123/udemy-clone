import { TopSection } from '@/app/(main)/_components/TopSection'
import { FeatureSection } from '@/app/(main)/_components/FeatureSection'
import { RecentlyAddedSection } from '@/app/(main)/_components/RecentlyAddedSection'
import { CategorySection } from '@/app/(main)/_components/CategorySection'
import { TestimonialSection } from '@/app/(main)/_components/TestimonialSection'
import { JoinNowSection } from '@/app/(main)/_components/JoinNowSection'
import { getAllCourses } from '@/actions/get-all-courses'
import { Course, User } from '.prisma/client'

export default async function Home () {
  const courses = (await getAllCourses()) as (Course & { author: User })[];
  return (
    <div
      className="bg-gray-50 dark:bg-black text-gray-800 dark:text-gray-200">
      <div className={'relative'}>
        <TopSection/>
        <FeatureSection/>
        <RecentlyAddedSection courses={courses}/>
        <CategorySection/>
        <TestimonialSection/>
        <JoinNowSection/>
      </div>
    </div>
  )
}
