import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

export function TopSection() {
  return (
    <section className="md:min-h-[60vh] py-12 md:py-16 flex items-center justify-between overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900/90 dark:to-zinc-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase mb-2 bg-gradient-to-r from-violet-500 to-primary bg-clip-text text-transparent">Professional Development</h2>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-r from-gray-900 via-primary/90 to-gray-800 dark:from-white dark:via-primary-foreground dark:to-gray-300 bg-clip-text text-transparent">
                Advance Your Career Through Expert-Led Courses
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Access premium educational content designed by industry leaders to help you master in-demand skills and achieve your professional goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="font-medium bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-700 border-0">
                <Link href="/courses" className="flex items-center">
                  Browse Courses <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="font-medium">
                <Link href="/about" className="flex items-center">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className="relative w-full max-w-[600px] h-[400px]">
              <Image
                src="/hero.png"
                alt="Professional Learning"
                fill
                priority
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg">
                <p className="text-sm font-medium bg-gradient-to-r from-gray-900 to-primary dark:from-white dark:to-primary-foreground bg-clip-text text-transparent">Join over 10,000+ professionals</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Advancing their careers with our courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
