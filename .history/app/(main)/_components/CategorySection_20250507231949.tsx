'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const categories = [
  {
    id: "development",
    title: 'Development',
    description: 'Web, mobile, and software development courses',
    image: '/Software code testing-rafiki.svg',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    count: 425,
    link: '/courses/development'
  },
  {
    id: "design",
    title: 'UI/UX Design',
    description: 'User interface and user experience design',
    image: '/UI-UX team-rafiki.svg',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    count: 310,
    link: '/courses/design'
  },
  {
    id: "business",
    title: 'Business & Growth',
    description: 'Business strategy, marketing, and leadership',
    image: '/Business growth-rafiki.svg',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    count: 283,
    link: '/courses/business'
  },
  {
    id: "analytics",
    title: 'Data Analytics',
    description: 'Data science, visualization, and business intelligence',
    image: '/Analytics-rafiki.svg',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    count: 198,
    link: '/courses/analytics'
  }
];

export function CategorySection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold uppercase tracking-wider text-sm">Find your path</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
            Explore Course Categories
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover professional courses designed to help you advance your career and build valuable skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group h-full"
            >
              <div className={`h-full ${category.bgColor} ${category.borderColor} border rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                <div className="mb-5 mx-auto">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100px, 150px"
                    />
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 text-center ${category.textColor}`}>
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow text-center">
                  {category.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="bg-white/80 text-gray-700 text-sm px-3 py-1 rounded-full font-medium">
                    {category.count}+ courses
                  </span>
                  <span className={`${category.textColor} font-medium text-sm inline-flex items-center group-hover:translate-x-1 transition-transform`}>
                    Explore <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-primary hover:bg-primary/90">
            <Link href="/categories" className="flex items-center">
              View All Categories
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
