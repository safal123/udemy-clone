"use client"

import {Chapter} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import ConfirmModal from "@/components/shared/ConfirmModal";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import { ReloadIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

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
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)

    const handleChapterDelete = async () => {
      try {
        setIsDeleting(true)
        setTimeout(async() => {
          await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
          toast.success("Chapter deleted")
          setIsDeleting(false)
          router.push(`/teacher/courses/${courseId}`)
        }, 1000)
        router.refresh()
      } catch (e) {
        setIsDeleting(false)
        toast.error("Something went wrong")
      }
    }

    const handleChapterPublish = async () => {
      try {
        setIsPublishing(true)
        if (chapter.isPublished) {
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        } else {
          await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        }
        toast.success("Chapter updated")
        router.refresh()
      } catch (e) {
        toast.error("Something went wrong")
      } finally {
        setIsPublishing(false)
      }
    }

    return (
      <div className={"flex items-center justify-between gap-x-2 w-full md:w-auto"}>
        <Button
          disabled={isDisabled || isPublishing}
          onClick={handleChapterPublish}
          size={"sm"}
        >
          {isPublishing ? <ReloadIcon className={"mr-2 animate-spin"}/> : null}
          {chapter.isPublished ? "Unpublish" : "Publish"}
        </Button>
        <ConfirmModal
          onConfirm={handleChapterDelete}
        >
          <Button
            size={"sm"}
            variant={"destructive"}
            className={"w-16"}
            disabled={isDeleting}
          >
            {isDeleting ? <ReloadIcon className={"mr-2 animate-spin"}/> : null}
            <Trash className={"h-4 w-4"}/>
          </Button>
        </ConfirmModal>
      </div>
    )
  }

export default ChapterActions
