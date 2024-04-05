import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware ({
  publicRoutes: [
    '/',
    '/sign-up',
    '/api/uploadthing',
    '/api/courses/all',
    '/api/webhooks/stripe'
  ]
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
