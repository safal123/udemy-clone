import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import CourseFilters from './_components/CourseFilters';
import { db } from '@/lib/db';

export const metadata = {
  title: 'Explore Courses | Learning Platform',
  description: 'Browse our catalog of professional courses designed to help you advance your career',
};

type CoursePageProps = {
  searchParams: {
    category?: string;
    search?: string;
  }
};

async function getCourses(categoryId?: string) {
  try {
    return await db.course.findMany({
      where: {
        isPublished: true,
        ...(categoryId && categoryId !== 'all' ? { categoryId } : {})
      },
      include: {
        category: true,
        chapters: {
          where: { isPublished: true },
          select: { id: true, title: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return [];
  }
}

async function getCategories() {
  try {
    return await db.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

// Calculate course duration based on chapters
function getDuration(chapterCount: number) {
  return `${chapterCount * 30} min`;
}

export default async function CourseSearchPage({ searchParams }: CoursePageProps) {
  const { category: categoryId, search } = searchParams;

  // Fetch data in parallel
  const [courses, categories] = await Promise.all([
    getCourses(categoryId),
    getCategories()
  ]);

  // Client-side filtering for search (since we do this in the browser)
  const filteredCourses = search
    ? courses.filter(course =>
      course.title?.toLowerCase().includes(search.toLowerCase())
    )
    : courses;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900/90 dark:to-zinc-900 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-gray-900 via-primary/90 to-gray-800 dark:from-white dark:via-primary-foreground dark:to-gray-300 bg-clip-text text-transparent">
              Discover Courses
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              Explore our professional courses designed to help you advance your career and master new skills.
            </p>
          </div>

          {/* Search and Filter */}
          <Suspense fallback={<div className="h-12 w-full bg-gray-100 animate-pulse rounded-lg mb-10" />}>
            <CourseFilters categories={categories} initialCategory={categoryId} initialSearch={search} />
          </Suspense>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video w-full relative bg-gray-100 dark:bg-gray-800">
                  {course.imageUri ? (
                    <Image
                      src={course.imageUri}
                      alt={course.title || 'Course image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    {course.category && (
                      <Badge variant="secondary" className="ml-2">
                        {course.category.name}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-2 line-clamp-2">
                    {course.description || 'No description available'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{getDuration(course.chapters.length)}</span>
                    <span className="mx-2">•</span>
                    <span>{course.chapters.length} chapters</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="font-semibold">
                    {course.price ? `$${course.price.toFixed(2)}` : 'Free'}
                  </div>
                  <Button asChild>
                    <Link href={`/courses/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results Message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
