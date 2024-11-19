import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface CourseProgressProps {
  value: number
  variant: 'default' | 'success'
  size: 'default' | 'sm'
}

const colorByVariant = {
  default: 'bg-secondary',
  success: 'bg-success'
}

const sizeByVariant = {
  default: 'text-sm',
  sm: 'text-xs'
}

const CourseProgress =
  ({
     value = 0,
     variant,
     size
   }: CourseProgressProps) => {
    return (
      <div className="p-2">
        { value > 0 &&
          <Progress
            value={ value }
            className={ `h-2` }
            variant={ 'primary' }
          /> }
        <Button variant={ 'secondary' } className={ 'mt-2 rounded-full w-full' }>
          <span
            className={ cn ('font-medium py-1 px-2 rounded-full', colorByVariant[variant] || 'default', sizeByVariant[size] || 'default') }>
            { Math.round (value) }% Complete
          </span>
        </Button>
      </div>
    )
  }

export default CourseProgress
