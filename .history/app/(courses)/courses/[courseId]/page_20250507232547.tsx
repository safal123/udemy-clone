import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { auth, UserButton } from '@clerk/nextjs'
import { getHasPurchased } from '@/actions/get-has-purchased'
import Image from 'next/image'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  BookOpen,
  Clock,
  Edit,
  GraduationCap,
  Laptop,
  LockIcon,
  PlayCircle,
  Share2,
  Shield,
  Star,
  Users
} from 'lucide-react'
import { Preview } from '@/components/shared/Preview'
import { cn } from '@/lib/utils'

const CoursePage = async ({ params }: {
  params: {
    courseId: string;
  }
}) => {
  const { userId } = auth()
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

  if (!course || !course.chapters.length || !course.isPublished) {
    redirect('/')
  }
  const { hasPurchased } = await getHasPurchased({
    courseId: params.courseId,
    userId: userId || ''
  })

  const canPurchase = course.price && !hasPurchased && course.userId !== userId
  const isOwner = course.userId === userId
  const canView = course.isPublished && (isOwner || hasPurchased)

  // Calculate total duration of course
  const totalChapters = course.chapters.length;
  const freeChapters = course.chapters.filter(chapter => chapter.isFree).length;
  const totalDuration = "10.5 hours"; // This would ideally be calculated from actual chapter durations

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100 min-h-screen">
      {/* Header with breadcrumb and user actions */}
      <div className="border-b dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-primary">Courses</Link>
            <span>/</span>
            <span className="text-primary truncate max-w-[200px]">{course.title}</span>
          </div>
          <div className="flex items-center space-x-4">
            {isOwner && (
              <Link href={`/teacher/courses/${course.id}`}>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Course
                </Button>
              </Link>
            )}
            <UserButton afterSignOutUrl={'/'} />
          </div>
        </div>
      </div>

      {/* Hero section with course image and main info */}
      <div className="bg-slate-50 dark:bg-gray-900 border-b dark:border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-7/12">
              <div className="flex mb-4 items-center">
                <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {course.categoryId || "Development"}
                </div>
                <div className="flex ml-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs ml-2 text-gray-600 dark:text-gray-400">5.0 (256 reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>

              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                {"Master the fundamentals and advanced concepts in this comprehensive course"}
              </p>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <Image
                    src={course.author.imageUri || '/images/placeholder.jpg'}
                    alt={`${course.author.firstName} ${course.author.lastName || ''}`}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white dark:border-gray-800"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium">Instructor</p>
                    <p className="text-primary font-semibold">{course.author.firstName} {course.author.lastName || ''}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex flex-col mr-6">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{totalDuration}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">{totalChapters} chapters</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Lifetime Access</span>
                </div>

                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Laptop className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Access on mobile and desktop</span>
                </div>

                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">Certificate of completion</span>
                </div>
              </div>

              {/* Mobile CTA for small screens */}
              <div className="lg:hidden mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
                  <div className="text-3xl font-bold mb-4 text-primary">
                    A${course.price}
                  </div>

                  {canPurchase ? (
                    <CourseEnrolButton course={course} />
                  ) : canView ? (
                    <Link href={`/courses/${course.id}/chapters/${course.chapters[0].id}`} className="w-full">
                      <Button className="w-full">
                        <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full">Not Available</Button>
                  )}

                  <p className="text-xs text-center mt-3 text-gray-500">
                    30-Day Money-Back Guarantee
                  </p>
                </div>
              </div>
            </div>

            {/* Course image and CTA for desktop */}
            <div className="lg:w-5/12">
              <div className="relative rounded-xl overflow-hidden shadow-xl mb-6 aspect-video">
                <Image
                  src={(course.imageUri as string) || '/images/placeholder.jpg'}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <PlayCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>

              {/* Desktop CTA */}
              <div className="hidden lg:block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                <div className="text-3xl font-bold mb-6 text-primary">
                  A${course.price}
                </div>

                {canPurchase ? (
                  <div className="mb-4">
                    <CourseEnrolButton course={course} />
                  </div>
                ) : canView ? (
                  <Link href={`/courses/${course.id}/chapters/${course.chapters[0].id}`} className="w-full block mb-4">
                    <Button className="w-full">
                      <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full mb-4">Not Available</Button>
                )}

                <Button variant="outline" className="w-full mb-6">
                  <Share2 className="mr-2 h-4 w-4" /> Share Course
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    30-Day Money-Back Guarantee
                  </p>
                  <p className="text-xs text-gray-500">
                    Full Lifetime Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course content section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-7/12">
            {/* Course description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">About This Course</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                {course.description ? (
                  <Preview value={course.description} />
                ) : (
                  <p>Learn valuable skills that will enhance your professional career path and open up new opportunities in the industry.</p>
                )}
              </div>
            </div>

            {/* What you'll learn section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">What You&apos;ll Learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {["Master core concepts and principles", "Build real-world projects", "Learn industry best practices", "Gain practical experience"].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course content/curriculum */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Course Content</h2>
              <div className="bg-slate-50 dark:bg-gray-900 rounded-xl overflow-hidden border dark:border-gray-800">
                <div className="p-4 bg-slate-100 dark:bg-gray-800 border-b dark:border-gray-700 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="font-medium">{totalChapters} chapters</span>
                    <span className="mx-2">•</span>
                    <span>{totalDuration} total length</span>
                  </div>
                </div>

                <div className="divide-y dark:divide-gray-800">
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="p-4 hover:bg-slate-100 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-start">
                        {chapter.isFree || hasPurchased || isOwner ? (
                          <PlayCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        ) : (
                          <LockIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        )}

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className={cn("font-medium",
                              (!chapter.isFree && !hasPurchased && !isOwner) && "text-gray-500"
                            )}>
                              {index + 1}. {chapter.title}
                            </h3>

                            {chapter.isFree && !hasPurchased && !isOwner && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                                Free Preview
                              </span>
                            )}
                          </div>

                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {chapter.isFree || hasPurchased || isOwner ? (
                              <Link
                                href={`/courses/${course.id}/chapters/${chapter.id}`}
                                className="text-primary"
                              >
                                Preview chapter
                              </Link>
                            ) : (
                              "Locked"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-5/12">
            {/* Instructor info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700 mb-8">
              <h2 className="text-xl font-bold mb-4">Your Instructor</h2>
              <div className="flex items-start mb-4">
                <Image
                  src={course.author.imageUri || '/images/placeholder.jpg'}
                  alt={`${course.author.firstName} ${course.author.lastName || ''}`}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{course.author.firstName} {course.author.lastName || ''}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{course.author.email || 'Professional Instructor'}</p>
                </div>
              </div>
              <div className="flex mb-4 text-sm">
                <div className="mr-4 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>4.9 Rating</span>
                </div>
                <div className="mr-4 flex items-center">
                  <Users className="h-4 w-4 text-primary mr-1" />
                  <span>10K+ Students</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-primary mr-1" />
                  <span>15 Courses</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Experienced educator with a passion for teaching practical skills. Specializes in creating comprehensive learning experiences that prepare students for real-world challenges.
              </p>
            </div>

            {/* Course stats */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4">Course Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Level</span>
                  <span className="font-medium">All Levels</span>
                </div>
                <div className="flex justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Chapters</span>
                  <span className="font-medium">{totalChapters}</span>
                </div>
                <div className="flex justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Total Duration</span>
                  <span className="font-medium">{totalDuration}</span>
                </div>
                <div className="flex justify-between pb-3 border-b dark:border-gray-700">
                  <span className="text-gray-500 dark:text-gray-400">Free Chapters</span>
                  <span className="font-medium">{freeChapters}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Last Updated</span>
                  <span className="font-medium">November 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage



