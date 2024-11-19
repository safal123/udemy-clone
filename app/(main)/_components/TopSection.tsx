import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function TopSection() {
  return (
    <section className="min-h-[50vh] flex items-center justify-center bg-background overflow-hidden">
      <div className="mx-auto text-center z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary rounded-full border border-primary px-12 py-4">
          Learn Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Explore thousands of courses to boost your skills and career.
        </p>
        <div className="flex justify-center space-x-4">
          <Button>
            <Link href="/signup" className="text-white px-6 py-2 rounded-md">
              Start Learning
            </Link>
          </Button>
          <Button variant="outline" className="text-primary px-6 py-2 rounded-md">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
