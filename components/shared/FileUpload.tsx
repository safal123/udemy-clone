"use client"

import {UploadDropzone} from "@/lib/uploadThing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange?: (url?: string) => void
    endpoint: keyof typeof ourFileRouter
}

const FileUpload = ({
    onChange,
    endpoint
                    }: FileUploadProps) => {
    return (
        <div>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    if (onChange) {
                        onChange(res[0].url)
                    }
                }}
                onUploadError={(error: Error) => {
                    toast.error("Something went wrong")
                }}
            />
        </div>
    )
}

export default FileUpload;