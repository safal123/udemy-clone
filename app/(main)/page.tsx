import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs'

const HomePage = async () => {
  const user = await currentUser()
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Welcome to LearnMemo
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              Learn, Memorize, Repeat
            </h1>
            <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
              LearnMemo is a simple and effective way to learn and memorize
            </p>
          </div>

          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <Link href={'/dashboard/search'}>
              <Button className={'rounded-full'}>
                Get Started and Learn
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
