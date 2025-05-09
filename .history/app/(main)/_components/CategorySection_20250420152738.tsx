import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    title: 'Programming & Development',
    description: 'Web, mobile, and software development courses',
    image: '/categories/programming.jpg',
    icon: '💻',
    count: 425,
    link: '/courses/programming'
  },
  {
    title: 'Design & Creative',
    description: 'UI/UX, graphic design, and multimedia production',
    image: '/categories/design.jpg',
    icon: '🎨',
    count: 310,
    link: '/courses/design'
  },
  {
    title: 'Marketing & Business',
    description: 'Digital marketing, SEO, and business strategy',
    image: '/categories/marketing.jpg',
    icon: '📊',
    count: 283,
    link: '/courses/marketing'
  },
  {
    title: 'Data Science & Analytics',
    description: 'Machine learning, AI, and data visualization',
    image: '/categories/data-science.jpg',
    icon: '📈',
    count: 198,
    link: '/courses/data-science'
  }
];

export function CategorySection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-base font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-violet-600 dark:from-primary dark:to-violet-400 bg-clip-text text-transparent">Explore by Category</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Find the perfect course for your goals
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our extensive catalog of courses organized by in-demand professional fields and specialized disciplines.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="group">
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg mb-5">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/20 z-10" />
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="flex items-center justify-center text-6xl absolute inset-0 z-0 bg-gray-200 dark:bg-gray-800">
                  {category.icon}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-primary/20 backdrop-blur-sm text-white mb-3">
                    {category.count}+ courses
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-foreground transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-[85%]">{category.description}</p>
                <span className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="font-medium">
            <Link href="/categories" className="flex items-center">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
