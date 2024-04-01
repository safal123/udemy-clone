import Image from 'next/image'

export const Loading = () => {
  return (
    <div className='grid place-items-center h-screen w-screen bg-gray-900/10'>
      <Image
        src='/logo.svg'
        alt='logo'
        width={120}
        height={120}
        className='animate-pulse duration-700'
      />
    </div>
  )
}
