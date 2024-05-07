import {db} from "@/lib/db";
import {Categories} from "@/app/(dashbaord)/dashboard/search/_components/Categories";
import {ScrollArea} from "@/components/ui/scroll-area";
import CourseCard from "@/components/shared/CourseCard";
import { Category, Course } from '.prisma/client'
import {auth} from "@clerk/nextjs";
import { revalidatePath } from 'next/cache'

const getCategories = async () => {
  return db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
}

const getCourses = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(url + "/api/courses/all")

  if (!res.ok) {
    return
  }
  return await res.json()
}


const SearchPage = async () => {
  revalidatePath('/dashboard/search')
  const categories = await getCategories()
  const courses = await getCourses()

  const isOwner = (id: string) => {
    const {userId} = auth()
    if (!userId) return false
    return userId === id
  }


  return (
    <div className={"p-6"}>
      <ScrollArea className={"w-full whitespace-nowrap rounded-md border p-4"}>
        <Categories items={categories}/>
      </ScrollArea>
      <div className={"grid xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-4 mt-4"}>
        {courses.length > 0 ? courses?.map((course: any & { category: Category }) => (
          <CourseCard
            key={course.id}
            course={course}
            isOwner = {isOwner(course.userId)}
          />
        )) : 'No courses found'}
      </div>
    </div>
  );
}

export default SearchPage;
