import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth } from '@clerk/nextjs'

const f = createUploadthing ()

const handleAuth = () => {
  const {userId} = auth ()
  if (!userId) {
    throw new UploadThingError ('Unauthorized')
  }
  return {userId}
}

export const ourFileRouter = {
  courseImage: f ({image: {maxFileSize: '4MB', maxFileCount: 1}})
    .middleware (() => handleAuth ())
    .onUploadComplete (() => {
    }),

  courseAttachment: f (['text', 'video', 'audio', 'image', 'pdf'])
    .middleware (() => handleAuth ())
    .onUploadComplete (() => {
    }),

  chapterVideo: f ({video: {maxFileSize: '512GB', maxFileCount: 1}})
    .middleware (() => handleAuth ())
    .onUploadComplete (() => {
    }),
  profileImage: f ({image: {maxFileSize: '4MB', maxFileCount: 1}})
    .middleware (() => handleAuth ())
    .onUploadComplete (async (file: any) => {
    })
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;
