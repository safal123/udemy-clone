"use client"

import {Chapter} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import ConfirmModal from "@/components/shared/ConfirmModal";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";

interface ChapterActionsProps {
  chapter: Chapter;
  courseId: string;
  chapterId: string;
  isDisabled?: boolean;
}

const ChapterActions =
  ({
     chapter,
     courseId,
     chapterId,
     isDisabled = false
   }: ChapterActionsProps) => {
    const router = useRouter()
    const handleChapterDelete = async () => {
      try {
        await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
        toast.success("Chapter deleted")
        router.refresh()
        router.push(`/teacher/courses/${courseId}`)
      } catch (e) {
        toast.error("Something went wrong")
      }
    }

    const handleChapterPublish = async () => {
      try {
        if (chapter.isPublished) {
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        } else {
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        }
        toast.success("Chapter updated")
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
          {chapter.isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModal onConfirm={handleChapterDelete}>
          <Button
            size={"sm"}
          >
            <Trash className={"h-4 w-4"}/>
          </Button>
        </ConfirmModal>
      </div>
    )
  }

export default ChapterActions
