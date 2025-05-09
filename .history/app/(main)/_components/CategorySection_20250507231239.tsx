'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Code, Paintbrush, BarChart3, LineChart } from 'lucide-react'

const categories = [
  {
    title: 'Programming & Development',
    description: 'Web, mobile, and software development courses',
    image: '/Software code testing-rafiki.svg',
    fallbackColor: 'from-blue-500 to-indigo-700',
    glowColor: 'blue',
    icon: <Code className="h-12 w-12" />,
    count: 425,
    link: '/courses/programming'
  },
  {
    title: 'Design & Creative',
    description: 'UI/UX, graphic design, and multimedia production',
    image: '/UI-UX team-rafiki.svg',
    fallbackColor: 'from-purple-500 to-violet-700',
    glowColor: 'purple',
    icon: <Paintbrush className="h-12 w-12" />,
    count: 310,
    link: '/courses/design'
  },
  {
    title: 'Marketing & Business',
    description: 'Digital marketing, SEO, and business strategy',
    image: '/Business growth-rafiki.svg',
    fallbackColor: 'from-emerald-500 to-teal-700',
    glowColor: 'emerald',
    icon: <BarChart3 className="h-12 w-12" />,
    count: 283,
    link: '/courses/marketing'
  },
  {
    title: 'Data Science & Analytics',
    description: 'Machine learning, AI, and data visualization',
    image: '/Analytics-rafiki.svg',
    fallbackColor: 'from-amber-500 to-orange-700',
    glowColor: 'amber',
    icon: <LineChart className="h-12 w-12" />,
    count: 198,
    link: '/courses/data-science'
  }
];

export function CategorySection() {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
      {/* Background patterns - light/dark variants */}
      <div className="absolute inset-0 bg-[url('/grid-background.jpg')] bg-center opacity-5 dark:opacity-10"></div>
      <div className="absolute w-full h-full">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-72 h-72 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 dark:bg-primary/10 backdrop-blur-sm border border-primary/10 dark:border-primary/20 mb-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-foreground">Interactive Categories</span>
          </div>

          <h2 className="text-base font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-violet-600 dark:from-primary dark:to-violet-400 bg-clip-text text-transparent mb-2">Explore by Category</h2>
          <p className="mt-2 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Find the perfect course for your goals
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Discover cutting-edge courses in today&apos;s most in-demand professional fields, expertly curated for the future of work.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="perspective-1000">
              <div
                className="category-card relative h-80 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 bg-white dark:bg-zinc-800/50 group border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glass morphism background */}
                <div className="absolute inset-0 backdrop-blur-md bg-white/30 dark:bg-black/30 z-0"></div>

                {/* SVG background with gradient overlay */}
                <div className="absolute inset-0 z-0 flex items-center justify-center p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent opacity-90"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.fallbackColor} opacity-5 dark:opacity-20`}></div>

                  <div className="relative w-full h-full flex items-center justify-center opacity-10 dark:opacity-20 transform scale-125 group-hover:scale-150 transition-transform duration-700">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={index < 2}
                    />
                  </div>
                </div>

                {/* Content container with glass effect */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between backdrop-blur-sm bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-2xl transition-all duration-500">
                  {/* Glowing orb with icon */}
                  <div
                    className={`relative h-16 w-16 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 text-white ${category.glowColor === 'blue' ? 'bg-blue-500/20 dark:bg-blue-500/30 ring-blue-500/20 dark:ring-blue-500/30' :
                        category.glowColor === 'purple' ? 'bg-purple-500/20 dark:bg-purple-500/30 ring-purple-500/20 dark:ring-purple-500/30' :
                          category.glowColor === 'emerald' ? 'bg-emerald-500/20 dark:bg-emerald-500/30 ring-emerald-500/20 dark:ring-emerald-500/30' :
                            'bg-amber-500/20 dark:bg-amber-500/30 ring-amber-500/20 dark:ring-amber-500/30'
                      } ring-2`}
                  >
                    {category.icon}
                    <div className={`absolute inset-0 rounded-full ${category.glowColor === 'blue' ? 'bg-blue-500/10 dark:bg-blue-500/20' :
                        category.glowColor === 'purple' ? 'bg-purple-500/10 dark:bg-purple-500/20' :
                          category.glowColor === 'emerald' ? 'bg-emerald-500/10 dark:bg-emerald-500/20' :
                            'bg-amber-500/10 dark:bg-amber-500/20'
                      } blur-md`}></div>
                  </div>

                  {/* Main content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-foreground transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 transform transition-all duration-500 opacity-80 group-hover:opacity-100">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/5">
                        {category.count}+ courses
                      </span>
                      <span className={`rounded-full p-2 transition-all duration-300 border group-hover:scale-110 ${category.glowColor === 'blue' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-500/30' :
                          category.glowColor === 'purple' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-500/30' :
                            category.glowColor === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30' :
                              'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
                        }`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Glowing border on hover - adaptive to theme */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${category.glowColor === 'blue' ? 'light-blue-glow dark:blue-glow' :
                    category.glowColor === 'purple' ? 'light-purple-glow dark:purple-glow' :
                      category.glowColor === 'emerald' ? 'light-emerald-glow dark:emerald-glow' :
                        'light-amber-glow dark:amber-glow'
                  }`}>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="group relative overflow-hidden transition-all duration-300 hover:bg-primary/5 dark:hover:bg-primary/10">
            <Link href="/categories" className="flex items-center px-6 py-2 font-medium">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/10 to-violet-500/10 dark:from-primary/20 dark:to-violet-500/20 blur"></div>
          </Button>
        </div>
      </div>

      {/* CSS for glowing effects - light/dark variants */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .category-card {
          transform: translateZ(0);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .category-card:hover {
          transform: translateZ(10px);
        }

        /* Light theme glows - softer */
        .light-blue-glow {
          box-shadow: 0 0 15px 1px rgba(59, 130, 246, 0.2), inset 0 0 5px 1px rgba(59, 130, 246, 0.2);
        }

        .light-purple-glow {
          box-shadow: 0 0 15px 1px rgba(147, 51, 234, 0.2), inset 0 0 5px 1px rgba(147, 51, 234, 0.2);
        }

        .light-emerald-glow {
          box-shadow: 0 0 15px 1px rgba(16, 185, 129, 0.2), inset 0 0 5px 1px rgba(16, 185, 129, 0.2);
        }

        .light-amber-glow {
          box-shadow: 0 0 15px 1px rgba(245, 158, 11, 0.2), inset 0 0 5px 1px rgba(245, 158, 11, 0.2);
        }

        /* Dark theme glows - stronger */
        .blue-glow {
          box-shadow: 0 0 15px 1px rgba(59, 130, 246, 0.4), inset 0 0 10px 1px rgba(59, 130, 246, 0.4);
        }

        .purple-glow {
          box-shadow: 0 0 15px 1px rgba(147, 51, 234, 0.4), inset 0 0 10px 1px rgba(147, 51, 234, 0.4);
        }

        .emerald-glow {
          box-shadow: 0 0 15px 1px rgba(16, 185, 129, 0.4), inset 0 0 10px 1px rgba(16, 185, 129, 0.4);
        }

        .amber-glow {
          box-shadow: 0 0 15px 1px rgba(245, 158, 11, 0.4), inset 0 0 10px 1px rgba(245, 158, 11, 0.4);
        }
      `}</style>
    </section>
  );
}
