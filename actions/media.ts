"use server"

import { db } from '@/lib/db'
import { UTApi } from 'uploadthing/server'
import { auth } from '@clerk/nextjs'
import { MediaType } from '.prisma/client'

const utapi = new UTApi();


export const getAllImages = async () => {
  try {
    const {userId} = auth ()
    if (!userId) {
      return {
        error: 'Unauthorized'
      }
    }
    const images = await db.media.findMany ({
      where: {
        createdBy: userId,
        type: MediaType.IMAGE
      },
      include:{
        owner: true,
        course: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return {
      images,
      statusCode: 200
    }
  } catch (error) {
    console.error ('[GET_ALL_COURSES]', error)
    return {
      error: 'Cannot fetch courses',
      statusCode: 500
    }
  }
}

export const deleteImage = async (key: string) => {
  try {
    const {userId} = auth ()
    if (!userId) {
      return {
        error: 'Unauthorized'
      }
    }

    const image = await db.media.findFirst({
      where: {
        OR: [
          { id: key },
          { storageId: key }
        ]
      }
    })

    if (userId !== image?.createdBy) {
      return {
        error: 'Unauthorized',
        statusCode: 401
      }
    }

    if (!image || !image.storageId) {
      return {
        error: 'Image not found',
        statusCode: 404
      }
    }

    await utapi.deleteFiles(image.storageId)
    await db.media.delete({
      where: {
        id: image.id
      }
    })

    return {
      message: 'Image deleted successfully',
      statusCode: 200
    }
  } catch (error) {
    console.error('[DELETE_IMAGE_ERROR]', error)
    return {
      error: 'Failed to delete image. Please try again later.',
      statusCode: 500
    }
  }
}

export const uploadCroppedImage = async (data: any) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        error: 'Unauthorized'
      };
    }

    const files = data.formData.getAll('file');
    const response = await utapi.uploadFiles(files) as any;
    console.log("RESPONSE", response);
    if (response[0].error !== null) {
      throw new Error('Failed to upload files');
    }
    const media = await db.media.create({
      data: {
        createdBy: userId,
        type: MediaType.IMAGE,
        url: response[0].data.url,
        mimeType: response[0].data.type,
        name: response[0].data.name,
        size: response[0].data.size,
        storageId: response[0].data.key,
        originalUrl: data.originalUrl
      }
    });

    return {
      statusCode: 200,
      media
    };
  } catch (error) {
    console.error('[UPLOAD_IMAGE_ERROR]', error);
    return {
      error: 'Failed to upload image. Please try again later.',
      statusCode: 500
    };
  }
};

