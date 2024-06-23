import IconBadge from '@/components/shared/IconBadge'
import { LucideIcon } from 'lucide-react'

interface InfoCardProps {
  title: string,
  description: string,
  icon: LucideIcon
}

const InfoCard = ({ title, description, icon: Icon }: InfoCardProps) => {
  return (
    <div className={ 'bg-indigo-500 dark:bg-[#081f37] border dark:border-indigo-900 p-4 rounded-md flex items-center space-x-4' }>
      <IconBadge icon={Icon} variant={'success'} />
      <div>
        <h2 className={ 'text-lg font-semibold text-gray-300 dark:text-gray-100' }>
          { title }
        </h2>
        <p className={ 'text-xl font-bold text-gray-400 dark:text-gray-100' }>
          { description }
        </p>
      </div>
    </div>
  )
}

export default InfoCard
