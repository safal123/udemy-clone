import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, CheckCircle } from 'lucide-react'

export function JoinNowSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-3 dark:bg-primary/20">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary/90 to-gray-800 dark:from-white dark:via-primary-foreground dark:to-gray-300 bg-clip-text text-transparent">
            Join our community of lifelong learners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get unlimited access to our growing library of courses taught by industry experts and advance your career today.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto text-sm">
            {[
              "Unlimited course access",
              "Expert instructors",
              "Certification options",
              "Career advancement"
            ].map((feature, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-2">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Button size="lg" className="font-medium bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-700 border-0 min-w-[180px]">
              <Link href="/sign-up" className="flex items-center">
                Join Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="font-medium min-w-[180px]">
              <Link href="/courses" className="flex items-center">
                Explore Courses
              </Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account? <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
