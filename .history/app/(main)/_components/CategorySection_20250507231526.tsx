'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const categories = [
  {
    title: 'Programming & Development',
    description: 'Master coding, web development, and software engineering',
    icon: '/icons/code.png',
    count: 425,
    featured: ['React', 'Python', 'JavaScript'],
    link: '/courses/programming'
  },
  {
    title: 'Design & Creative',
    description: 'Learn UI/UX, graphic design, and creative skills',
    icon: '/icons/design.png',
    count: 310,
    featured: ['Figma', 'UI/UX', 'Photoshop'],
    link: '/courses/design'
  },
  {
    title: 'Marketing & Business',
    description: 'Develop marketing strategies and business acumen',
    icon: '/icons/marketing.png',
    count: 283,
    featured: ['SEO', 'Social Media', 'Analytics'],
    link: '/courses/marketing'
  },
  {
    title: 'Data Science & Analytics',
    description: 'Analyze data, build models, and derive insights',
    icon: '/icons/data.png',
    count: 198,
    featured: ['Python', 'Machine Learning', 'Visualization'],
    link: '/courses/data-science'
  }
];

export function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our wide range of courses designed to enhance your skills and advance your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <img
                      src={category.icon}
                      alt=""
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${category.title.charAt(0)}&background=random`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{category.title}</h3>
                    <p className="text-gray-500 text-sm">{category.count}+ courses</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-5">{category.description}</p>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Popular Topics:</div>
                  <div className="flex flex-wrap gap-2">
                    {category.featured.map((tag, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={category.link}
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Browse Courses <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
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
