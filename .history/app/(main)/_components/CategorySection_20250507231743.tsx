'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

const categories = [
  {
    id: "programming",
    title: 'Programming & Development',
    description: 'Web, mobile, and software development courses',
    image: '/icons/programming.png',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    count: 425,
    link: '/courses/programming'
  },
  {
    id: "design",
    title: 'Design & Creative',
    description: 'UI/UX, graphic design, and multimedia production',
    image: '/icons/design.png',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    count: 310,
    link: '/courses/design'
  },
  {
    id: "marketing",
    title: 'Marketing & Business',
    description: 'Digital marketing, SEO, and business strategy',
    image: '/icons/marketing.png',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    count: 283,
    link: '/courses/marketing'
  },
  {
    id: "data",
    title: 'Data Science & Analytics',
    description: 'Machine learning, AI, and data visualization',
    image: '/icons/data.png',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    count: 198,
    link: '/courses/data-science'
  }
];

export function CategorySection() {
  return (
    <section className="py-16 bg-gray-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group h-full"
            >
              <div className={`h-full ${category.bgColor} ${category.borderColor} border-2 rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-lg`}>
                <div className="mb-4">
                  <div className="inline-block p-2 rounded-lg bg-white shadow-sm">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${category.textColor}`}>
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {category.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="bg-white/60 text-gray-700 text-sm px-3 py-1 rounded-full">
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
