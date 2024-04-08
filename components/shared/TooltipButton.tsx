import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface TooltipButtonProps {
  children: React.ReactNode
  tooltip: string
}

const TooltipButton = ({children, tooltip, ...props}: TooltipButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          { children }
        </TooltipTrigger>
        <TooltipContent>
          { tooltip }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipButton
