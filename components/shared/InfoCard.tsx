import IconBadge from '@/components/shared/IconBadge'
import { LucideIcon } from 'lucide-react'

interface InfoCardProps {
  title: string,
  description: string,
  icon: LucideIcon
}

const InfoCard = ({ title, description, icon: Icon }: InfoCardProps) => {
  return (
    <div className={ 'border p-4 rounded-md flex items-start space-x-4' }>
      <IconBadge icon={Icon} variant={'success'} />
      <div>
        <h2 className={ 'text-xl font-semibold' }>
          { title }
        </h2>
        <p className={ 'text-xl font-bold' }>
          { description }
        </p>
      </div>
    </div>
  )
}

export default InfoCard
