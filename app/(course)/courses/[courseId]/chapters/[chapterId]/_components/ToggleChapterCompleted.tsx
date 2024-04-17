"use client"

import { Button } from '@/components/ui/button'
import { Check, CircleCheck } from 'lucide-react'
import { Chapter } from '@prisma/client'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type ToggleChapterCompletedProps = {
  chapter: Chapter
  isCompleted: boolean
  userId: string
}

const ToggleChapterCompleted = ({chapter, isCompleted, userId}: ToggleChapterCompletedProps) => {
  const router = useRouter()
  const handleChapterComplete = async () => {
    try {
      await axios.patch(`/api/courses/${chapter.courseId}/chapters/${chapter.id}/toggleIsCompleted`, {
        isCompleted: !isCompleted,
      })
      await router.refresh()
      toast({
        title: isCompleted ? 'Chapter marked as incomplete' : 'Chapter marked as completed',
        description: isCompleted ? 'You have marked this chapter as incomplete' : 'You have marked this chapter as completed',
      })
    } catch (e) {
      console.log(e)
      console.error('Error marking chapter as complete', e)
      toast({
        title: 'Error marking chapter as complete',
        description: 'There was an error marking this chapter as complete',
      })
    }
  }

  return (
    <Button
      onClick={handleChapterComplete}
      variant={ isCompleted ? 'outline' : 'default' }
    >
      { isCompleted ? <Check className={ 'mr-2 h-4 w-4' }/> : <CircleCheck className={ 'mr-2 h-4 w-4' }/> }
      { isCompleted ? 'Mark as incomplete' : 'Mark as completed' }
    </Button>
  )
}

export default ToggleChapterCompleted
