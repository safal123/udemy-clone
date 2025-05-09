import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// Professional testimonial data
const testimonials = [
  {
    name: "Alex Morgan",
    role: "Software Engineer at TechCorp",
    comment: "I completed the Full-Stack Web Development course and it immediately helped me land a new role with a 25% salary increase. The hands-on projects and code reviews were invaluable for my portfolio.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    course: "Full-Stack Web Development",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "UX Designer",
    comment: "The UI/UX Design Masterclass completely transformed my approach to design. The instructor's feedback was detailed and actionable, and I've already implemented what I learned in my current job.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    course: "UI/UX Design Masterclass",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Director",
    comment: "After completing the Digital Marketing Analytics course, I was able to increase our conversion rates by 40%. The real-world case studies and practical assignments made all the difference.",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    course: "Digital Marketing Analytics",
    rating: 4
  }
];

export function TestimonialSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-base font-semibold tracking-wider uppercase bg-gradient-to-r from-primary to-violet-600 dark:from-primary dark:to-violet-400 bg-clip-text text-transparent mb-2">Success Stories</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Hear from our students
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We&apos;ve helped thousands of professionals achieve their career goals. Here&apos;s what some of them have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group relative overflow-hidden border-gray-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-md dark:bg-zinc-900/60 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Rating stars */}
                <div className="flex mb-4">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* Testimonial comment */}
                <div className="mb-6 flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">&quot;{testimonial.comment}&quot;</p>
                  <p className="text-sm text-primary font-medium">Course: {testimonial.course}</p>
                </div>

                {/* User info */}
                <div className="flex items-center pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <div className="h-10 w-10 mr-4 rounded-full overflow-hidden relative">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button variant="outline" className="group">
            <Link href="/reviews" className="flex items-center text-sm font-medium">
              Read more success stories
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
