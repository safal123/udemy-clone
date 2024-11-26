import { Button } from '@/components/ui/button'
import { CirclePlus, CircleX, Pencil } from 'lucide-react'
import TooltipButton from '@/components/shared/TooltipButton'
import React from 'react'
import { cn } from '@/lib/utils'

interface EditButtonProps {
  isEditing: boolean
  toggleEditing: () => void
  tooltip: string
  mode?: 'edit' | 'add'
}

const AddEditButton = ({isEditing, toggleEditing, tooltip, mode = 'edit'}: EditButtonProps) => {
  return (
    <TooltipButton tooltip={ tooltip }>
      <Button
        size={ 'sm' }
        className={ cn ('', isEditing ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-800') }
        variant={ 'outline' } onClick={ toggleEditing }>
        { isEditing ?
          <CircleX className={ 'h-4 w-4 text-white' }/> :
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
