import {DataTable} from "@/app/(dashbaord)/(routes)/teacher/courses/_components/DataTable";
import {columns} from "@/app/(dashbaord)/(routes)/teacher/courses/_components/Columns";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

const getCourses = async () => {
  const token = await auth().getToken()
  const res = await fetch("http://localhost:8000/api/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
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
