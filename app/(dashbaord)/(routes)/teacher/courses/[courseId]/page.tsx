import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import IconBadge from "@/components/shared/IconBadge";
import {LayoutDashboard} from "lucide-react";


const CoursePage = async ({params}: {
    params: {
        courseId: string;
    }
}) => {
    const {userId} = auth()

    if (!userId) redirect("/sign-in")

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        }
    })

    console.log(course)

    if (!course) redirect("/")

    const requiredFields = [
        course.title,
        course.description,
        course.price,
        course.imageUri,
        course.categoryId
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(field => field).length
    const completionText = `${completedFields}/${totalFields}`

    return (
        <div className={"p-6"}>
            <div className={"flex items-center justify-between"}>
                <div className={"flex flex-col gap-y-2"}>
                    <h1 className={"text-2xl font-medium"}>
                        Course setup
                    </h1>
                    <span className={"text-sm text-slate-200 bg-slate-900 rounded-xl px-2 py-0.5"}>Complete all fields {completionText}</span>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"}>
                <div>
                    <div className={"flex items-center gap-x-2"}>
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className={"text-xl"}>Customise your course</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoursePage;