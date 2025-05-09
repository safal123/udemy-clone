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
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    fallbackColor: 'from-blue-500 to-indigo-700',
    glowColor: 'blue',
    icon: <Code className="h-12 w-12 text-white" />,
    count: 425,
    link: '/courses/programming'
  },
  {
    title: 'Design & Creative',
    description: 'UI/UX, graphic design, and multimedia production',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    fallbackColor: 'from-purple-500 to-violet-700',
    glowColor: 'purple',
    icon: <Paintbrush className="h-12 w-12 text-white" />,
    count: 310,
    link: '/courses/design'
  },
  {
    title: 'Marketing & Business',
    description: 'Digital marketing, SEO, and business strategy',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    fallbackColor: 'from-emerald-500 to-teal-700',
    glowColor: 'emerald',
    icon: <BarChart3 className="h-12 w-12 text-white" />,
    count: 283,
    link: '/courses/marketing'
  },
  {
    title: 'Data Science & Analytics',
    description: 'Machine learning, AI, and data visualization',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    fallbackColor: 'from-amber-500 to-orange-700',
    glowColor: 'amber',
    icon: <LineChart className="h-12 w-12 text-white" />,
    count: 198,
    link: '/courses/data-science'
  }
];

export function CategorySection() {
  return (
    <section className="py-24 relative overflow-hidden bg-black/95 dark:bg-black">
      {/* Futuristic background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      <div className="absolute w-full h-full">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 left-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">Interactive Categories</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-violet-400">
            Explore Learning Dimensions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm">
            Discover cutting-edge courses in today&apos;s most in-demand professional fields, expertly curated for the future of work.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="perspective-1000">
              <div
                className="category-card relative h-80 rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 bg-gray-900 group border border-white/5"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: `0 0 25px 1px rgba(var(--${category.glowColor}-rgb), 0.05)`,
                }}
              >
                {/* Glass morphism effect */}
                <div className="absolute inset-0.5 rounded-2xl p-0.5 backdrop-blur-xl z-10 overflow-hidden">
                  {/* The image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 filter brightness-[0.35] contrast-125 group-hover:brightness-[0.25]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90"></div>
                  </div>

                  {/* Glowing orb with icon */}
                  <div
                    className={`absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center z-20 backdrop-blur-md transition-all duration-500 group-hover:scale-110 ${category.glowColor === 'blue' ? 'bg-blue-500/20 ring-blue-500/30' :
                      category.glowColor === 'purple' ? 'bg-purple-500/20 ring-purple-500/30' :
                        category.glowColor === 'emerald' ? 'bg-emerald-500/20 ring-emerald-500/30' :
                          'bg-amber-500/20 ring-amber-500/30'
                      } ring-2`}
                    style={{
                      boxShadow: `0 0 25px 1px rgba(var(--${category.glowColor}-rgb), 0.3)`,
                    }}
                  >
                    {category.icon}
                    <div className={`absolute inset-0 rounded-full ${category.glowColor === 'blue' ? 'bg-blue-500/20' :
                      category.glowColor === 'purple' ? 'bg-purple-500/20' :
                        category.glowColor === 'emerald' ? 'bg-emerald-500/20' :
                          'bg-amber-500/20'
                      } blur-md`}></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-20 transform transition-transform duration-500">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-foreground transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3 transform transition-all duration-500 opacity-80 group-hover:opacity-100">
                      {category.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/5">
                        {category.count}+ courses
                      </span>
                      <span className={`rounded-full p-2 ${category.glowColor === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                        category.glowColor === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                          category.glowColor === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-amber-500/20 text-amber-400'
                        } backdrop-blur-sm transition-all duration-300 border border-white/5 group-hover:border-white/20 group-hover:scale-110`}>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Glowing border on hover */}
                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 ${category.glowColor === 'blue' ? 'blue-glow' :
                  category.glowColor === 'purple' ? 'purple-glow' :
                    category.glowColor === 'emerald' ? 'emerald-glow' :
                      'amber-glow'
                  }`}>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="relative overflow-hidden group bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 backdrop-blur-sm">
            <Link href="/categories" className="flex items-center px-6 py-2 font-medium">
              Explore All Categories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 to-violet-500/20 blur"></div>
          </Button>
        </div>
      </div>

      {/* CSS for glowing effects */}
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

        .blue-glow {
          box-shadow: 0 0 15px 1px rgba(59, 130, 246, 0.5), inset 0 0 15px 1px rgba(59, 130, 246, 0.5);
        }

        .purple-glow {
          box-shadow: 0 0 15px 1px rgba(147, 51, 234, 0.5), inset 0 0 15px 1px rgba(147, 51, 234, 0.5);
        }

        .emerald-glow {
          box-shadow: 0 0 15px 1px rgba(16, 185, 129, 0.5), inset 0 0 15px 1px rgba(16, 185, 129, 0.5);
        }

        .amber-glow {
          box-shadow: 0 0 15px 1px rgba(245, 158, 11, 0.5), inset 0 0 15px 1px rgba(245, 158, 11, 0.5);
        }

        :root {
          --blue-rgb: 59, 130, 246;
          --purple-rgb: 147, 51, 234;
          --emerald-rgb: 16, 185, 129;
          --amber-rgb: 245, 158, 11;
        }
      `}</style>
    </section>
  );
}
