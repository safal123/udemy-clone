import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  BookOpen,
  Clock,
  CreditCard,
  Users,
  CheckCircle,
  Award,
  Laptop
} from 'lucide-react'

export function FeatureSection() {
  const features = [
    {
      title: 'Expert Instructors',
      description: 'Learn from certified professionals and industry leaders with years of real-world experience.',
      icon: <Award className="h-8 w-8" />,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Flexible Learning',
      description: 'Study at your own pace with on-demand video, mobile access, and downloadable resources.',
      icon: <Clock className="h-8 w-8" />,
      color: 'from-emerald-600 to-teal-600'
    },
    {
      title: 'Premium Content',
      description: 'Access high-quality, professionally produced courses with regular updates and improvements.',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'from-amber-600 to-orange-600'
    },
    {
      title: 'Recognized Certification',
      description: 'Earn industry-recognized certificates to showcase your expertise and advance your career.',
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'from-purple-600 to-violet-600'
    },
    {
      title: 'Enterprise Solutions',
      description: 'Comprehensive learning solutions for teams and organizations of all sizes.',
      icon: <Laptop className="h-8 w-8" />,
      color: 'from-rose-600 to-pink-600'
    },
    {
      title: 'Community & Networking',
      description: 'Connect with peers, mentors and potential employers in our thriving community.',
      icon: <Users className="h-8 w-8" />,
      color: 'from-cyan-600 to-sky-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-zinc-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-base font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-violet-600 dark:from-primary dark:to-violet-400 bg-clip-text text-transparent">Why choose us</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            World-class learning platform for professionals
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to accelerate your career and stay competitive in today's rapidly evolving professional landscape.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-primary/30 to-primary-foreground/30 dark:from-primary/20 dark:to-primary-foreground/20 text-primary mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {feature.description}
              </p>

              <div className="pt-2">
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="font-medium bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-700 border-0">
            <Link href="/courses" className="flex items-center">
              Browse All Courses
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
