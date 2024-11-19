import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FeatureSection() {
  return (
    <section className="py-12  border-t border-b mb-2">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-primary">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Expert Instructors',
              desc: 'Learn from industry leaders with years of experience.',
              icon: '👩‍🏫'
            },
            {
              title: 'Flexible Learning',
              desc: 'Access courses on mobile, tablet, and desktop.',
              icon: '📱'
            },
            {
              title: 'Affordable Pricing',
              desc: 'Premium courses at an affordable rate.',
              icon: '💸'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white dark:bg-gray-900 shadow rounded-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm max-w-xs mx-auto">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
