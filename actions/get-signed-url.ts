'use server'

import { auth } from '@clerk/nextjs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})


export const getS3SignedUrl = async (chapterId: string, contentType: string) => {
  try {
    const {userId} = auth ()
    if (!userId) {
      return {
        error: 'Unauthorized'
      }
    }

    if (!chapterId) {
      return {
        error: 'Invalid request'
      }
    }

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: chapterId,
      ContentType: contentType
    })

    const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 3600 })

    return {
      success: true,
      signedUrl
    }
  } catch (error) {
    console.error ('[GET_SIGNED_URL]', error)
    return {
      error: 'Internal Server Error'
    }
  }
}
