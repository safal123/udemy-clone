import { AlertTriangle, CheckCircleIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const bannerVariants = cva (
  'border rounded-md items-center p-4 text-sm flex md:items-center w-full text-wrap',
  {
    variants: {
      variant: {
        warning: 'border-yellow-300 text-yellow-300 text-theme',
        success: 'border bg-primary dark:bg-accent'
      }
    },
    defaultVariants: {
      variant: 'warning'
    }
  }
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon
}

export const Banner =
  ({
     label,
     variant
   }: BannerProps) => {
    const Icon = iconMap[variant || 'warning']

    return (
      <div className={ cn (bannerVariants ({variant})) }>
        <Icon className="h-4 w-4 mr-2"/>
        { label }
      </div>
    )
  }
