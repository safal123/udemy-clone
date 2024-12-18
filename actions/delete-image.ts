"use server"

import { utapi } from '@/app/api/uploadthing/route'
import { db } from '@/lib/db'

export const deleteImage = async (key: string) => {
  try {
    if (!key) {
      return {
        error: 'Image not found',
        statusCode: 404
      }
    }

    // Check if key is imageId or storageId
    const image = await db.media.findFirst({
      where: {
        OR: [
          { id: key },
          { storageId: key }
        ]
      }
    })

    if (!image || !image.storageId) {
      return {
        error: 'Image not found',
        statusCode: 404
      }
    }

    await utapi.deleteFiles(image.storageId)
    // Delete the record from the database
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
