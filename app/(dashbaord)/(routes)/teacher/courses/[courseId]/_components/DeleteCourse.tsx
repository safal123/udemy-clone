"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import ConfirmModal from "@/components/shared/ConfirmModal";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface DeleteCourseProps {
  courseId: string;
}

const DeleteCourse = ({courseId}: DeleteCourseProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    setIsLoading(true)
    try {
      await axios.delete(`/api/courses/${courseId}`)
      toast.success("Course deleted")
      await router.refresh()
      router.push("/teacher/courses")
    } catch (e) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ConfirmModal onConfirm={onDelete}>
      <Button variant="outline" disabled={isLoading}>
        <Trash className={"h-6 w-6 text-gray-500 animate-pulse"}/>
      </Button>
    </ConfirmModal>
  )
}

export default DeleteCourse
