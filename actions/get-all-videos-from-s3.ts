'use server'

import { auth } from '@clerk/nextjs'
import { S3Client, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_SERVER!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})


export const getAllVideosFromS3 = async () => {
  try {
    const {userId} = auth ()
    if (!userId) {
      return {
        error: 'Unauthorized'
      }
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
    }

    const data = await client.send(new ListObjectsCommand(params))
    if (!data.Contents) {
      return {
        error: 'No videos found'
      }
    }
    return {
      success: true,
      videos: data.Contents
    }
  } catch (error) {
    console.error ('[GET_VIDEOS_FROM_S3]', error)
    return {
      error: 'Internal Server Error'
    }
  }
}
