import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DataTable} from "@/app/(dashbaord)/(routes)/teacher/courses/_components/DataTable";
import {columns} from "@/app/(dashbaord)/(routes)/teacher/courses/_components/Columns";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import {PlusCircle} from "lucide-react";


const CoursePage = async () => {
  const {userId} = auth()

  if (!userId) redirect("/sign-in")

  const courses = await db.course.findMany({
    where: {
      userId
    },
    orderBy: {
      updatedAt: "desc"
    },
  })

  return (
    <div className={"p-6"}>
      <div className={"flex items-center justify-end"}>
        <Link href={"/teacher/courses/create"}>
          <Button>
            <PlusCircle className={"mr-2"}/>
            New Course
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={courses}/>
    </div>
  );
}

export default CoursePage;
