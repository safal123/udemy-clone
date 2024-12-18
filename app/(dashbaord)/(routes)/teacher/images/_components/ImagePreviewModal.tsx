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
import { Eye, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteImage } from '@/actions/delete-image'
import { toast } from '@/components/ui/use-toast'

type ImagePreviewModalProps = {
  imageUrl: string,
  altText: string,
  imageKey?: string,
  imageId?: string
}

export function ImagePreviewModal ({ imageUrl, altText, imageKey, imageId }: ImagePreviewModalProps) {
  const router = useRouter ()
  const [loading, setLoading] = useState (false)
  const handleDelete = async () => {
    try {
      setLoading (true)
      if (!imageKey || !imageId) {
        throw new Error ('Image key is missing')
      }
      await deleteImage (imageKey || imageId)
      toast ({
        title: 'Image deleted',
        description: '🎉 Your image has been deleted successfully'
      })
      await router.refresh ()
    } catch (error) {
      console.log (error)
      toast ({
        title: 'Error',
        description: 'Cannot delete image'
      })
    } finally {
      setLoading (false)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={ 'sm' }>
          <Eye className="w-4 h-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="w-full h-auto">
        <DialogHeader>
          <DialogTitle>
            { altText }
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[80vh]">
          <Image
            src={ imageUrl }
            alt={ altText }
            width={ 500 }
            height={ 500 }
            className={ 'w-full rounded-t-md object-cover' }
          />
        </div>
        <DialogFooter className={'gap-2'}>
          <Button
            onClick={ handleDelete }
            variant={ 'destructive' }
            size={ 'sm' }
            className={ 'mr-2' }
            disabled={ loading }
          >
            { loading && <Loader2 className="w-4 h-4 animate-spin mr-2"/> }
            Delete
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
