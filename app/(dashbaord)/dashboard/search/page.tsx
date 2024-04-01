import {db} from "@/lib/db";
import {Categories} from "@/app/(dashbaord)/dashboard/search/_components/Categories";
import {ScrollArea} from "@/components/ui/scroll-area";
import CourseCard from "@/components/shared/CourseCard";
import {Course} from ".prisma/client";
import {auth} from "@clerk/nextjs";

const getCategories = async () => {
  return db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
}

const getCourses = async () => {
  const res = await fetch("http://localhost:8000/api/courses/all")

  if (!res.ok) {
    return
  }
  return await res.json()
}


const SearchPage = async () => {
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
        {courses.length > 0 ? courses?.map((course: Course) => (
          <CourseCard key={course.id} course={course} isOwner = {isOwner(course.userId)}/>
        )) : 'No courses found'}
      </div>
    </div>
  );
}

export default SearchPage;
