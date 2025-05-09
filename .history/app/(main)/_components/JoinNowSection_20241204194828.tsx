import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function JoinNowSection () {
  return (
    <section className="py-16 bg-gray-50 dark:bg-primary/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Start Learning Today</h2>
        <Button variant={'outline'} className={'text-primary'}>
          <Link href="/sign-up" className="w-[200px]">
            Join Now
          </Link>
        </Button>
      </div>
    </section>
  )
}
