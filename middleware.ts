import { authMiddleware } from '@clerk/nextjs'
import { db } from '@/lib/db'

export default authMiddleware ({
  publicRoutes: [
    '/',
    '/sign-up',
    '/api/uploadthing',
    '/api/courses/all',
  ],

  ignoredRoutes: [
    '/api/webhooks/stripe',
    '/api/webhooks/clerk',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
