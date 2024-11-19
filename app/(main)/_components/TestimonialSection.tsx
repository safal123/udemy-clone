import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function TestimonialSection () {
  return (
    <section className="py-12 bg-background border-t">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-primary">
          What Our Students Say
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: 'John Doe',
              comment: 'This platform has transformed my career!',
              image: 'https://randomuser.me/api/portraits/men/85.jpg'
            },
            {
              name: 'Jane Smith',
              comment: 'I love the flexibility of learning at my own pace.',
              image: 'https://randomuser.me/api/portraits/women/85.jpg'
            }
          ].map((testimonial, index) => (
            <div key={index} className="flex p-6 bg-white dark:bg-gray-900 shadow rounded-lg">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={60}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm">{testimonial.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
