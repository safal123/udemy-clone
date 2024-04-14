'use client'

import { useFormStatus } from 'react-dom'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SubmitButton = () => {
  const {pending} = useFormStatus ()

  return <>
    { pending
      ?
      <Button disabled className="w-fit" type={ 'submit' }>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Saving...
      </Button>
      :
      <Button className="w-fit" type={ 'submit' }>
        <Check className="mr-2 h-4 w-4"/>
        Save Changes
      </Button>
    }
  </>
}

export default SubmitButton
