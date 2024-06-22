'use client'

import { Button } from '@/components/ui/button'
import { Check, CircleCheck, Loader2 } from 'lucide-react'
import { Chapter } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ToggleChapterCompletedProps = {
  chapter: Chapter
  isCompleted: boolean
  userId: string
}

const ToggleChapterCompleted = ({chapter, isCompleted, userId}: ToggleChapterCompletedProps) => {
  const [isProcessing, setIsProcessing] = useState (false)
  const router = useRouter ()
  const handleChapterComplete = async () => {
    try {
      setIsProcessing (true)
      await axios.patch (`/api/courses/${ chapter.courseId }/chapters/${ chapter.id }/toggleIsCompleted`, {
        isCompleted: !isCompleted
      })
      toast ({
        title: isCompleted ? 'Chapter marked as incomplete' : 'Chapter marked as completed',
        description: isCompleted ? 'You have marked this chapter as incomplete' : 'You have marked this chapter as completed'
      })
      await router.refresh ()
      setIsProcessing (false)
    } catch (e) {
      console.log (e)
      console.error ('Error marking chapter as complete', e)
      toast ({
        title: 'Error marking chapter as complete',
        description: 'There was an error marking this chapter as complete'
      })
    } finally {
      // setIsProcessing (false)
    }
  }

  return (
    <Button
      disabled={ isProcessing }
      onClick={ handleChapterComplete }
      className={ cn (isProcessing && 'bg-primary/90 cursor') }
      variant={ isCompleted ? 'secondary' : 'default' }
    >
      { isProcessing ? <Loader2 className={ 'mr-2 h-4 w-4 animate-spin' }/> :
        isCompleted ? <Check className={ 'mr-2 h-4 w-4' }/> :
          <CircleCheck className={ 'mr-2 h-4 w-4' }/> }
      { isCompleted ? 'Completed' : 'Mark as completed' }
    </Button>
  )
}

export default ToggleChapterCompleted
