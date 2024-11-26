import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { getHasPurchased } from '@/actions/get-has-purchased'
import Image from 'next/image'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Edit, Edit2Icon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const CoursePage =
  async ({ params }: {
    params: {
      courseId: string;
    }
  }) => {
    const { userId } = auth ()
    const course = await db.course.findFirst ({
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
      redirect ('/')
    }
    const { hasPurchased } = await getHasPurchased ({
      courseId: params.courseId,
      userId: userId || ''
    })

    const canPurchase = course.price && !hasPurchased && course.userId !== userId
    const isOwner = course.userId === userId
    const canView = course.isPublished &&( isOwner || hasPurchased)
    return (
      <div className="bg-gray-50 text-gray-800 dark:bg-black dark:text-gray-200">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-24">
            <div className="flex-1 items-center justify-center w-full h-full">
              <Image
                src={course.imageUri || '/images/placeholder.jpg'}
                alt="Course Thumbnail"
                width={400}
                height={400}
                className="rounded-lg shadow-md object-cover w-full h-[300px]"
              />
              <div className="lg:col-span-2 mt-6 hidden md:block">
                <Separator />
                <h2 className="text-2xl font-bold mb-2">Course Content</h2>
                <div className="space-y-4">
                  <CourseSection
                    title="Introduction to Docker"
                    lessons={ ['Introduction', 'Private Discord Invite'] }
                    duration="35m"
                  />
                  <CourseSection
                    title="Docker Command Line Interface"
                    lessons={ ['Installation', 'Containers vs Images'] }
                    duration="33m"
                  />
                </div>
              </div>
            </div>

            {/* Course Details */ }
            <div className="flex-1 mx-auto">
              <h1 className="text-4xl font-bold mb-4 flex items-center">
                { course.title }
                { isOwner &&
                  <Link href={`/teacher/courses/${ course.id }`} className={'ml-auto'}>
                    <Edit className="h-10 w-10 ml-2 text-primary"/>
                  </Link>
                }
              </h1>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex items-center gap-4">
                <Image
                  src={course.author.imageUri || '/images/placeholder.jpg'}
                  alt="Author Image"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <p className={'flex flex-col text-xs'}>
                  <span>Author</span>
                  <span className={'font-semibold underline text-primary'}>{ course.author.firstName }</span>
                </p>
              </div>
              <p className="mb-6">
                { course.description }
              </p>
              <div className="text-4xl font-semibold mb-6">
                A${ course.price }
              </div>
              {canPurchase ?
              <div className="flex gap-4">
                <div className={'w-fit'}>
                  <CourseEnrolButton course={ course } />
                </div>
              </div>:
              <div>
                {canView &&
                <Link href={`/courses/${ course.id }/chapters/${ course.chapters[0].id }`}>
                  <Button>
                    Visit Course
                  </Button>
                </Link>
                }
              </div>}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-24">
            <div className="lg:col-span-2">
              {/*<h2 className="text-2xl font-bold mb-6">Course Content</h2>*/}
              {/*<div className="space-y-4">*/}
              {/*  <CourseSection*/}
              {/*    title="Introduction to Docker"*/}
              {/*    lessons={ ['Introduction', 'Private Discord Invite'] }*/}
              {/*    duration="35m"*/}
              {/*  />*/}
              {/*  <CourseSection*/}
              {/*    title="Docker Command Line Interface"*/}
              {/*    lessons={ ['Installation', 'Containers vs Images'] }*/}
              {/*    duration="33m"*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
            <div className="lg:col-span-1 space-y-8">
              <HighlightsSection/>
              <LearningOutcomesSection/>
              <PrerequisitesSection/>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default CoursePage

// Reusable Course Section Component
const CourseSection =
  ({
     title,
     lessons,
     duration
   }: {
    title: string;
    lessons: string[];
    duration: string;
  }) => (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-2">{ title }</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        { lessons.length } Lessons • { duration }
      </p>
      <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
        { lessons.map ((lesson, index) => (
          <li key={ index }>{ lesson }</li>
        )) }
      </ul>
    </div>
  )

// Sidebar Sections
const HighlightsSection = () => (
  <div>
    <h3 className="font-semibold text-lg mb-4">Highlights</h3>
    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
      <li>Hands-on Projects</li>
      <li>AWS Integration</li>
      <li>Lifetime Access</li>
    </ul>
  </div>
)

const LearningOutcomesSection = () => (
  <div>
    <h3 className="font-semibold text-lg mb-4">Learning Outcomes</h3>
    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
      <li>Fundamentals of Docker Containers</li>
      <li>Master Docker Networking</li>
    </ul>
  </div>
)

const PrerequisitesSection = () => (
  <div>
    <h3 className="font-semibold text-lg mb-4">Prerequisites</h3>
    <p className="text-gray-600 dark:text-gray-400">
      Basics knowledge of Computer Programming
    </p>
  </div>
)



