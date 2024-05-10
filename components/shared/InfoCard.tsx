import IconBadge from '@/components/shared/IconBadge'
import { LucideIcon } from 'lucide-react'

interface InfoCardProps {
  title: string,
  description: string,
  icon: LucideIcon
}

const InfoCard = ({ title, description, icon: Icon }: InfoCardProps) => {
  return (
    <div className={ 'bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md flex items-center space-x-4' }>
      <IconBadge icon={Icon} variant={'success'} />
      <div>
        <h2 className={ 'text-lg font-semibold text-gray-800 dark:text-gray-100' }>
          { title }
        </h2>
        <p className={ 'text-3xl font-bold text-gray-800 dark:text-gray-100' }>
          { description }
        </p>
      </div>
    </div>
  )
}

export default InfoCard
