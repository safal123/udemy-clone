import {LucideIcon} from "lucide-react"
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary dark:bg-primary/10",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-white dark:text-primary",
        success: "text-emerald-700",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-6 w-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
)

type BackgroundVariantProps = VariantProps<typeof backgroundVariants>
type IconVariantProps = VariantProps<typeof iconVariants>

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon
}

const IconBadge = ({icon: Icon, variant, size}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({variant, size}))}>
      <Icon className={cn(iconVariants({variant, size}))}/>
    </div>
  )
}

export default IconBadge
