"use client"

import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import ConfirmModal from "@/components/shared/ConfirmModal";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Course} from ".prisma/client";

interface CourseActionsProps {
  course: Course;
  courseId: string;
  isDisabled?: boolean;
}

const CourseActions =
  ({course, courseId, isDisabled = false}: CourseActionsProps) => {
    const router = useRouter()
    const handleChapterDelete = async () => {
      try {
        await axios.delete(`/api/courses/${courseId}`)
        toast.success("Chapter deleted")
        router.refresh()
        router.push(`/teacher/courses/${courseId}`)
      } catch (e) {
        toast.error("Something went wrong")
      }
    }

    const handleChapterPublish = async () => {
      try {
        if (course.isPublished) {
          await axios.patch(`/api/courses/${courseId}/unpublish`)
        } else {
          await axios.patch(`/api/courses/${courseId}/publish`)
        }
        toast.success("Course updated")
        router.refresh()
      } catch (e) {
        toast.error("Something went wrong")
      }
    }

    return (
      <div className={"flex items-center gap-x-2"}>
        <Button
          disabled={isDisabled}
          onClick={handleChapterPublish}
          size={"sm"}
        >
          {course.isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModal onConfirm={handleChapterDelete}>
          <Button
            size={"sm"}
            variant={"destructive"}
          >
            <Trash className={"h-4 w-4"}/>
          </Button>
        </ConfirmModal>
      </div>
    )
  }

export default CourseActions
