import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'

interface HomePageCarouselProps {
  images: {
    src: string,
    alt: string,
    title: string,
    subtitle: string,
    price: number
  }[]
}


const HomePageCarousel
  = ({images}: HomePageCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent>
        { images.map ((image, index) => (
          <CarouselItem key={ index }>
            <div className={ 'h-96 gap-4 flex items-center justify-between' }>
              <div className={ 'hidden lg:flex flex-col items-center justify-center flex-1 rounded-lg' }>
                <h1 className={ 'text-[12px] xl:text-4xl text-white font-bold mb-2' }>
                  { image.title }
                </h1>
                <Button>
                  Enroll Now for { formatPrice(image.price)}
                </Button>
              </div>
              <div className={ 'w-full lg:w-[600px] h-full relative' }>
                <Image
                  src={ image.src }
                  alt=""
                  width={ 700 }
                  height={ 700 }
                  className={ 'rounded-lg h-full w-full' }
                />
                <div className={ 'lg:hidden absolute inset-0 bg-gradient-to-r from-transparent to-black' }>
                  <div className={ 'flex flex-col items-center justify-center h-full text-white' }>
                    <h1 className={ 'text-[12px] xl:text-4xl font-bold mb-2' }>
                      { image.title }
                    </h1>
                    <Button>
                      Enroll Now for { formatPrice(image.price)}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        )) }
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext/>
    </Carousel>
  )
}

export default HomePageCarousel
