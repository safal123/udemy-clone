import Link from 'next/link'
import Image from 'next/image'
import { Course, User } from '.prisma/client'
import { ArrowRight, Clock, Star, StarHalf, Zap } from 'lucide-react'
import { PiArticle } from 'react-icons/pi'
import { BsUniversalAccess } from 'react-icons/bs'
import { RiInstallFill } from 'react-icons/ri'
import CourseEnrolButton from '@/app/(courses)/courses/[courseId]/chapters/[chapterId]/_components/CourseEnrolButton'
import { Chapter } from '@prisma/client'
import { formatPrice } from '@/lib/format'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

type RecentlyAddedSectionProps = {
  courses: (Course & { author: User })[];
};

export function RecentlyAddedSection({ courses }: RecentlyAddedSectionProps) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-base font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-violet-600 dark:from-primary dark:to-violet-400 bg-clip-text text-transparent mb-2">Hot & Fresh</h2>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                Recently Added Courses
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
                Explore our latest additions to keep your skills on the cutting edge of industry demands.
              </p>
            </div>
            <Button variant="outline" className="group mt-2 md:mt-0">
              <Link href="/courses" className="flex items-center text-sm font-medium">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses?.map((course, index) => (
              <div key={index} className="flex">
                <CourseCard course={course as Course & { author: User, chapters: Chapter[] }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const CourseCard = ({ course }: {
  course?: Course & {
    author: User,
    chapters: Chapter[]
  };
}) => {
  // Calculate average hours based on chapters length (for demo)
  const chaptersLength = course?.chapters?.length || 0;
  const estimatedHours = Math.max(3, Math.min(20, chaptersLength * 1.5));

  // Extract course price safely
  const price = course?.price || 0;

  // Get category from categoryId or fall back to default
  const categoryName = getCategoryName(course?.categoryId || null);

  return (
    <Card className="flex flex-col w-full overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-zinc-900 dark:border-zinc-800 group h-full">
      <div className="relative w-full aspect-video overflow-hidden">
        <Link href={`/courses/${course?.id}`}>
          <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
          <Image
            fill
            src={course?.imageUri || '/placeholder.jpg'}
            alt={course?.title || "Course thumbnail"}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {price === 0 && (
            <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">Free</Badge>
          )}
          {price > 0 && price < 2000 && (
            <Badge className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600">Bestseller</Badge>
          )}
        </Link>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Link href={`/courses/${course?.id}`} className="group-hover:text-primary transition-colors">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2">
              {course?.title}
            </h3>
          </Link>
        </div>
        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center mr-4">
            <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
            {estimatedHours} hours
          </span>
          <span className="flex items-center">
            <PiArticle className="h-3.5 w-3.5 mr-1 text-gray-400" />
            {chaptersLength} lectures
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow p-4 pt-3">
        <div className="flex items-center justify-between my-2">
          <div className="flex items-center">
            <div className="flex space-x-1 text-amber-400">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <StarHalf className="h-4 w-4 fill-current" />
            </div>
            <span className="ml-2 text-gray-600 dark:text-gray-300 font-medium text-xs">4.5</span>
          </div>
          <div className="text-sm font-semibold">
            {price === 0 ? (
              <span className="text-green-600 dark:text-green-500">Free</span>
            ) : (
              <span className="text-primary dark:text-primary-foreground">{formatPrice(price)}</span>
            )}
          </div>
        </div>

        <div className="mt-2 text-sm">
          <span className="line-clamp-2 text-gray-600 dark:text-gray-300">
            {course?.description || "Learn the essential skills needed to excel in this field with our comprehensive curriculum."}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary-foreground dark:hover:bg-primary/30">
            {categoryName}
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700">
            <Zap className="h-3 w-3 mr-1" />
            Beginner
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        {course && (
          <CourseEnrolButton course={course} />
        )}
      </CardFooter>
    </Card>
  );
};

// Helper function to get category name from categoryId
function getCategoryName(categoryId: string | null): string {
  // This would normally fetch from your category database
  // For now, returning placeholder values based on categoryId
  const categories: Record<string, string> = {
    "1": "Development",
    "2": "Business",
    "3": "Design",
    "4": "Marketing"
  };

  return categoryId && categories[categoryId]
    ? categories[categoryId]
    : "Development";
}

export default CourseCard;

