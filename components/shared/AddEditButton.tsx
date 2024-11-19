import { Button } from '@/components/ui/button'
import { CirclePlus, CircleX, Pencil } from 'lucide-react'
import TooltipButton from '@/components/shared/TooltipButton'
import React from 'react'
import { cn } from '@/lib/utils'

interface EditButtonProps {
  isEditing: boolean
  toggleEditing: () => void
  tooltip: string
  // default mode is 'edit'
  mode?: 'edit' | 'add'
}

const AddEditButton = ({isEditing, toggleEditing, tooltip, mode = 'edit'}: EditButtonProps) => {
  return (
    <TooltipButton tooltip={ tooltip }>
      <Button
        size={ 'sm' }
        className={ cn ('', isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 dark:bg-gray-800') }
        variant={ 'outline' } onClick={ toggleEditing }>
        { isEditing ?
          <CircleX className={ 'h-5 w-5 text-gray-900' }/> :
          mode === 'edit' ?
            <Pencil className={ 'h-4 w-4' }/>
            :
            <CirclePlus className={ 'h-4 w-4' }/>
        }
      </Button>
    </TooltipButton>
  )
}

export default AddEditButton
