import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ReactNode } from 'react'

interface AppTooltipProps {
  children: ReactNode
  message: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' // Optional button variant
  delayDuration?: number // Optional delay in milliseconds
  side?: 'top' | 'right' | 'bottom' | 'left' // Optional tooltip position
}

export function BaseTooltip
({
   children,
   message,
   variant = 'outline',
   delayDuration = 200,
   side = 'top'
 }: AppTooltipProps) {
  return (
    <TooltipProvider delayDuration={ delayDuration }>
      <Tooltip>
        <TooltipTrigger asChild>
          { children || <Button variant={ variant }>Hover</Button> }
        </TooltipTrigger>
        <TooltipContent side={ side }>
          <p>{ message }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
