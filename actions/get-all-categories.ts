'use server'

import { db } from '@/lib/db'

export const getAllCategories = async () => {
  try {
    return await db.category.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            courses: true
          }
        },
      }
    })
  } catch (error) {
    console.error('[GET_ALL_CATEGORIES]', error)
    return {
      error: 'Cannot fetch categories',
      statusCode: 500
    }
  }
}
