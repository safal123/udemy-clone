'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { EditIcon, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

type EditImageNameModalProps = {
  altText: string,
  imageKey?: string,
  imageId?: string
}

export function EditImageNameModal ({ altText, imageKey, imageId }: EditImageNameModalProps) {
  const router = useRouter ()
  const [title, setTitle] = useState<string> (altText)
  const [loading, setLoading] = useState (false)
  const handleEdit = async () => {
    console.log ('Edit Image Name')
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={ 'sm' }>
          <EditIcon className="w-4 h-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="w-full h-auto">
        <DialogHeader>
          <DialogTitle className={'pl-2'}>
            { altText }
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <Input
            value={ altText }
            onChange={ (e) => setTitle (e.target.value) }
          />
        </div>
        <DialogFooter className={'gap-2'}>
          <Button
            onClick={ handleEdit }
            variant={ 'destructive' }
            size={ 'sm' }
            className={ 'mr-2' }
            disabled={ loading }
          >
            { loading && <Loader2 className="w-4 h-4 animate-spin mr-2"/> }
            Save
          </Button>
          <DialogClose>
            <Button
              variant={ 'outline' }
              size={ 'sm' }
              className={ 'w-full' }
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
