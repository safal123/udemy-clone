import {DataTable} from "@/app/(dashbaord)/(routes)/teacher/courses/_components/DataTable";
import {columns} from "@/app/(dashbaord)/(routes)/teacher/courses/_components/Columns";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'

const getCourses = async () => {
  const token = await auth().getToken()
  const url = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(url + "/api/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  if (!res.ok) {
    return
  }
  return res.json()
}

const CoursePage = async () => {
  const {userId} = auth()
  if (!userId) redirect("/sign-in")

  const courses = await getCourses()

  return (
    <div className={"p-6"}>
      <DataTable columns={columns} data={courses}/>
    </div>
  );
}

export default CoursePage;
