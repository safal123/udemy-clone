"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, BookOpen, Clock, Filter, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define types based on Prisma schema
type Course = {
  id: string;
  title: string;
  description: string;
  price: number | null;
  imageUri: string | null;
  isPublished: boolean;
  categoryId: string | null;
  category?: {
    id: string;
    name: string;
  };
  chapters: {
    id: string;
    title: string;
  }[];
};

type Category = {
  id: string;
  name: string;
};

const CourseSearchPage = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');

  // Fetch courses and categories
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch categories
        const categoryRes = await fetch('/api/categories');
        if (!categoryRes.ok) throw new Error('Failed to fetch categories');
        const categoryData = await categoryRes.json();
        setCategories(categoryData);

        // Fetch courses with category info included
        let url = '/api/courses/all?includes=category,chapters';
        if (selectedCategory && selectedCategory !== 'all') {
          url += `&categoryId=${selectedCategory}`;
        }

        const courseRes = await fetch(url);
        if (!courseRes.ok) throw new Error('Failed to fetch courses');
        const courseData = await courseRes.json();
        setCourses(courseData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    return course.title?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Calculate course duration based on chapters
  const getDuration = (course: Course) => {
    // In a real app, you would sum up chapter durations
    // For this example, we'll estimate based on chapter count
    const chapterCount = course.chapters?.length || 0;
    return `${chapterCount * 30} min`;
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

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
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full rounded-full border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="w-full md:w-[220px]">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full rounded-full border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-1" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Course List */}
          {!isLoading && (
            <>
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
                        <span>{getDuration(course)}</span>
                        <span className="mx-2">•</span>
                        <span>{course.chapters?.length || 0} chapters</span>
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
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSearchPage;
