"use client"

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Textarea} from "@/components/ui/textarea";
import {Course} from ".prisma/client";

interface DescriptionFormProps {
    initialData: Course,
    courseId: string;
}

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description is required"
    })
})

const DescriptionForm = ({initialData, courseId}: DescriptionFormProps) => {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: initialData?.description || ""
        },
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("Course updated")
            toggleEditing()
            router.refresh()
        } catch {
            toast.error("Something went wrong")
        }
    }

    const toggleEditing = () => {
        setIsEditing((prev) => !prev)
    }

    return (
        <div className={"mt-6 border bg-slate-100 rounded-md p-4"}>
            <div className={"font-medium flex items-center justify-between"}>
                <h2 className={"text-xl"}>Course Description</h2>
                <Button variant={"ghost"} onClick={toggleEditing}>
                    {isEditing ?
                        <>
                            Cancel
                        </>
                        :
                        <>
                            <Pencil className={"h-4 w-4 mr-2"}/>
                            Edit Description
                        </>
                    }

                </Button>
            </div>
            {!isEditing ? <>
                    <p className={"text-sm mt-2 text-slate-500"}>
                        {initialData.description}
                    </p>
                </>
                :
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-8 mt-8"}>
                            <FormField
                                control={form.control}
                                name={"description"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor={"description"}>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                disabled={isSubmitting}
                                                placeholder={"e.g. React Hooks Fundamentals"}
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

export default DescriptionForm