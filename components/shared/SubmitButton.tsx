'use client'

import { useFormStatus } from 'react-dom'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'


interface SubmitButtonProps {
  savingText: String,
  defaultText: String,
  isSubmitting: Boolean
}

const SubmitButton
  = ({savingText = 'Saving ...', defaultText = 'Save changes', isSubmitting}: SubmitButtonProps) => {
  const {pending} = useFormStatus ()
  return <>
    { pending || isSubmitting
      ?
      <Button disabled className="w-fit" type={ 'submit' }>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        { savingText }
      </Button>
      :
      <Button className="w-fit" type={ 'submit' }>
        <Check className="mr-2 h-4 w-4"/>
        { defaultText }
      </Button>
    }
  </>
}

export default SubmitButton
