import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { getHasPurchased } from '@/actions/get-has-purchased'
import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle,
  Clock,
  MessageSquare,
  Play,
  ShieldCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Preview } from '@/components/shared/Preview'

const CoursePage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()

  // Fetch course data
  const course = await db.course.findFirst({
    where: {
      id: params.courseId
    },
    include: {
      chapters: {
        orderBy: {
          order: 'asc'
        }
      },
      author: true
    }
  })

  // Handle not found or unpublished course
  if (!course || !course.chapters.length || !course.isPublished) {
    return redirect('/')
  }

  // Check if user has purchased this course
  const { hasPurchased } = await getHasPurchased({
    courseId: params.courseId,
    userId: userId || ''
  })

  // Determine user access
  const isOwner = course.userId === userId
  const canPurchase = course.price && !hasPurchased && course.userId !== userId
  const canAccess = isOwner || hasPurchased

  // Course stats
  const totalChapters = course.chapters.length
  const freeChapters = course.chapters.filter(chapter => chapter.isFree).length

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Course header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-7/12 flex flex-col">
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <span className="bg-primary/20 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {course.categoryId || "Professional Development"}
                  </span>
                  <div className="ml-3 flex items-center text-xs text-slate-300">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>8 hours of content</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {course.title}
                </h1>
                <p className="text-slate-300 mb-4">
                  Master key skills and advance your career with expert instruction
                </p>

                <div className="flex items-center mt-3 mb-5 flex-wrap gap-2">
                  <div className="flex items-center bg-slate-800/50 px-3 py-1.5 rounded-md mr-2">
                    <BookOpen className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">{totalChapters} chapters</span>
                  </div>
                  <div className="flex items-center bg-slate-800/50 px-3 py-1.5 rounded-md mr-2">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">{freeChapters} free lessons</span>
                  </div>
                  <div className="flex items-center bg-slate-800/50 px-3 py-1.5 rounded-md">
                    <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Full support</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4 border-t border-slate-700/50 pt-4">
                <Image
                  src={course.author.imageUri || "/images/placeholder.jpg"}
                  alt={course.author.firstName || "Instructor"}
                  height={40}
                  width={40}
                  className="rounded-full object-cover border-2 border-primary/30"
                  unoptimized
                />
                <div className="ml-3">
                  <p className="font-medium">{course.author.firstName} {course.author.lastName || ""}</p>
                  <p className="text-xs text-slate-300">Course Instructor</p>
                </div>
                {canPurchase && (
                  <div className="ml-auto md:hidden">
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">
                      Enroll - A${course.price}
                    </Button>
                  </div>
                )}
              </div>

              <div className="hidden md:flex mt-auto space-x-3">
                {!canPurchase && canAccess && (
                  <Link href={`/courses/${course.id}/chapters/${course.chapters[0].id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg">
                      <Play className="h-4 w-4 mr-2" fill="currentColor" />
                      Start Learning
                    </Button>
                  </Link>
                )}
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  30-Day Guarantee
                </Button>
              </div>
            </div>

            <div className="md:w-5/12">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-slate-700/50">
                <div className="relative aspect-video">
                  <Image
                    src={course.imageUri || "/images/placeholder.jpg"}
                    alt={course.title || "Course"}
                    className="object-cover"
                    fill
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
                      <div className="relative bg-white/90 rounded-full p-4 cursor-pointer hover:bg-white transition-colors">
                        <Play className="h-8 w-8 text-primary" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>

                {canPurchase && (
                  <div className="bg-slate-800/80 backdrop-blur-sm p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold">
                        A${course.price}
                      </div>
                      <div className="text-sm text-slate-300">
                        <s className="opacity-70">A${(Number(course.price) * 1.7).toFixed(2)}</s>
                        <span className="ml-2 bg-primary/30 text-primary-foreground px-2 py-0.5 rounded text-xs">
                          41% off
                        </span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-bold text-lg mb-4">
                      Enroll Now
                    </Button>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">Full lifetime access</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">Mobile access</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">Certificate</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm">Support included</span>
                      </div>
                    </div>
                  </div>
                )}

                {canAccess && (
                  <div className="bg-slate-800/80 backdrop-blur-sm p-6 shadow-lg">
                    <div className="text-center mb-3 text-lg font-medium">
                      Continue your learning journey
                    </div>
                    <Link href={`/courses/${course.id}/chapters/${course.chapters[0].id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-bold">
                        <Play className="h-4 w-4 mr-2" fill="currentColor" />
                        Continue Learning
                      </Button>
                    </Link>
                    <div className="mt-4 text-center text-sm text-slate-300">
                      You have access to all course materials
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-7/12">
            {/* About this course */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">About This Course</h2>
              <div className="prose max-w-none">
                {course.description ? (
                  <Preview value={course.description} />
                ) : (
                  <p>
                    This comprehensive course is designed to help you master essential skills
                    and concepts. Through hands-on exercises and practical examples, you&apos;ll
                    build real-world expertise that can be applied immediately.
                  </p>
                )}
              </div>
            </div>

            {/* Course highlights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">What You&apos;ll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Build real-world projects",
                  "Learn industry best practices",
                  "Get personalized feedback",
                  "Join a community of learners",
                  "Receive a completion certificate",
                  "Access updated content"
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course chapters */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Course Content</h2>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-slate-100 p-4 flex justify-between items-center">
                  <div className="font-medium">
                    {totalChapters} chapters • 8 hours total
                  </div>
                </div>

                <div className="divide-y">
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          {canAccess || chapter.isFree ? (
                            <Play className="h-4 w-4 text-primary mr-2" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-slate-300 mr-2" />
                          )}
                          <span>
                            <span className="font-medium">{index + 1}. {chapter.title}</span>
                            {chapter.isFree && !canAccess && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                Free Preview
                              </span>
                            )}
                          </span>
                        </div>
                        {(canAccess || chapter.isFree) && (
                          <Link
                            href={`/courses/${course.id}/chapters/${chapter.id}`}
                            className="text-primary text-sm hover:underline"
                          >
                            Start
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-5/12">
            {/* Instructor section */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-slate-900">Your Instructor</h2>
              <div className="flex items-start mb-4">
                <Image
                  src={course.author.imageUri || "/images/placeholder.jpg"}
                  alt={course.author.firstName || "Instructor"}
                  height={60}
                  width={60}
                  className="rounded-full object-cover mr-4"
                  unoptimized
                />
                <div>
                  <h3 className="font-semibold">{course.author.firstName} {course.author.lastName || ""}</h3>
                  <p className="text-sm text-slate-500">Professional Instructor</p>
                </div>
              </div>
              <p className="text-slate-600">
                Experienced educator with expertise in this field. Passionate about helping
                students achieve their goals through practical, engaging learning experiences.
              </p>
            </div>

            {/* Requirements section */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4 text-slate-900">Requirements</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-800 mt-2 mr-2" />
                  <span>Basic understanding of the subject</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-800 mt-2 mr-2" />
                  <span>A computer with internet access</span>
                </li>
                <li className="flex items-start">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-800 mt-2 mr-2" />
                  <span>Enthusiasm to learn and practice</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage



