import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function TopSection() {
  return (
    <section className="md:min-h-[50vh] py-10 flex items-center justify-between overflow-hidden md:px-16 bg-gray-100 dark:bg-primary/5">
      <div className={'container mx-auto flex items-center space-x-4'}>
        <div className="flex-1 text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            Learn Anytime, Anywhere
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Explore thousands of courses to boost your skills and career.
          </p>
          <div className="flex">
            <Button>
              <Link href="/courses" className="text-white px-6 py-2 rounded-md">
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 hidden lg:block">
          <Image src="/hero.png" alt="Learning" width={700} height={500} className="object-cover rounded-lg shadow-lg overflow-hidden transform scale-105" />
        </div>
      </div>
    </section>
  );
}
