import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function CategorySection() {
  return (
    <section className="px-8 md:px-16 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Explore Categories
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: 'Programming',
              img: 'https://picsum.photos/seed/pie/200/300'
            },
            {
              title: 'Design',
              img: 'https://picsum.photos/seed/design/200/300'
            },
            {
              title: 'Marketing',
              img: 'https://picsum.photos/seed/marketing/200/300'
            },
            {
              title: 'Business',
              img: 'https://picsum.photos/seed/business/200/300'
            }
          ].map((category, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg group"
            >
              <Image
                src={category.img}
                alt={category.title}
                width={500}
                height={300}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
