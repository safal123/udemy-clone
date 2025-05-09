"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// Sample course data
const courses = [
  {
    id: 1,
    title: 'Introduction to Next.js',
    description: 'Learn the basics of Next.js and how to build server-rendered React applications.',
    duration: '4 hours',
    level: 'Beginner',
    tags: ['React', 'Next.js', 'JavaScript'],
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Dive deep into advanced React patterns and best practices.',
    duration: '6 hours',
    level: 'Intermediate',
    tags: ['React', 'JavaScript', 'Patterns'],
  },
  {
    id: 3,
    title: 'Fullstack Development with Next.js and Prisma',
    description: 'Build a fullstack application using Next.js, Prisma, and PostgreSQL.',
    duration: '8 hours',
    level: 'Advanced',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Fullstack'],
  },
  {
    id: 4,
    title: 'Mastering TypeScript',
    description: 'Become a TypeScript pro with advanced type safety and patterns.',
    duration: '5 hours',
    level: 'Intermediate',
    tags: ['TypeScript', 'JavaScript'],
  },
];

export default function CourseSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="bg-gray-100 dark:bg-primary/5">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Courses</h1>

        {/* Search Input */}
        <div className="flex gap-4 mb-8">
          <Input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md"
          />
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.duration}</span>
                  <span className="text-sm text-gray-500">{course.level}</span>
                </div>
                <Button className="w-full mt-4">Enroll Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No courses found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
