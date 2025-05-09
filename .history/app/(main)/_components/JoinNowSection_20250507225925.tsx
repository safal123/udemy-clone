import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export function JoinNowSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-violet-500/5 dark:from-primary/10 dark:to-violet-500/10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20 dark:opacity-10" />

      {/* Content container */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-foreground">Limited Time Offer</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-gray-900 via-primary to-violet-700 dark:from-white dark:via-primary-foreground dark:to-violet-300 bg-clip-text text-transparent">
              Transform your career with expert-led courses
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Join thousands of students already learning on our platform. Get unlimited access to our library of courses with new content added weekly.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Unlimited access to all courses",
                "Learn at your own pace, anywhere",
                "Certificate of completion for all courses",
                "30-day money-back guarantee"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-700 border-0 shadow-md">
                <Link href="/sign-up" className="flex items-center">
                  Join Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="font-medium">
                <Link href="/courses">
                  Browse Courses
                </Link>
              </Button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account? <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Right content - Stats card */}
          <div className="relative lg:ml-auto">
            <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-zinc-800">
              <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Popular
              </div>

              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Join Today and Get:</h3>

              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">First month for $9.99</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Then $19.99/month, cancel anytime</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Access to 1,000+ courses</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Including new releases every week</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">Exclusive learning paths</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Curated by industry experts</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Satisfied students</span>
                  <span className="font-bold text-primary">98%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full blur-xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
