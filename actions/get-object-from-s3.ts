'use server'

import { auth } from '@clerk/nextjs'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_SERVER!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})


export const getObjectFromS3 = async (objectId: string) => {
  try {
    const {userId} = auth ()
    if (!userId) {
      return {
        error: 'Unauthorized'
      }
    }

    if (!objectId) {
      return {
        error: 'Invalid request'
      }
    }

    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: objectId,
    })

    // @ts-ignore
    const objectUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 })

    return {
      success: true,
      objectUrl
    }
  } catch (error) {
    console.error ('[GET_OBJECT_FROM_S3]', error)
    return {
      error: 'Cannot get object from S3'
    }
  }
}
