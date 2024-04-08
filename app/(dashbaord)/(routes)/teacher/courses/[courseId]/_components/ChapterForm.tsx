"use client"

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {CirclePlus, Loader2} from "lucide-react";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Course} from ".prisma/client";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {ChaptersList} from "@/app/(dashbaord)/(routes)/teacher/courses/[courseId]/_components/ChapterList";
import {Chapter} from "@prisma/client";
import AddEditButton from '@/components/shared/AddEditButton'

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] }
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  })
})

const ChapterForm = ({initialData, courseId}: ChapterFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  })

  const {isSubmitting, isValid} = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success("Chapter added")
      toggleEditing()
      router.refresh()
      form.reset()
    } catch {
      toast.error("Something went wrong")
    }
  }

  const toggleEditing = () => {
    setIsEditing((prev) => !prev)
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }


  return (
    <div className={"relative mt-6 border bg-slate-100 dark:bg-black rounded-md p-4"}>
      {isUpdating && <div
        className={"absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center"}>
        <Loader2 className={"animate-spin h-6 w-6"}/>
      </div>}
      <div className={"font-medium flex items-center justify-between mb-2"}>
        <h2 className={"flex items-center space-x-4"}>
          <span className={"text-xl"}>Course chapters</span>
          <Badge
            className={"bg-theme hover:bg-theme/90 hidden sm:block"}
            variant={"default"}
          >
            {initialData.chapters.length} chapters
          </Badge>
        </h2>
        <AddEditButton
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          tooltip={!isEditing ? "Add new chapter" : "Cancel adding chapter"}
          mode={ 'add' }
        />
      </div>
      {!isEditing ? <>
          <div>
            <ChaptersList
              items={initialData.chapters || []}
              onReorder={onReorder}
            />
          </div>
        </>
        :
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-2 mt-4"}>
              <FormField
                control={form.control}
                name={"title"}
                render={({field}) => (
                  <FormItem>
                    <FormLabel htmlFor={"description"}>Chapter title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder={"e.g. Introduction to React Hooks"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className={"flex items-center gap-x-2"}>
                <Button
                  type={"submit"}
                  disabled={!isValid || isSubmitting}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </>

      }
    </div>
  )
}

export default ChapterForm
