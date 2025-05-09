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
import { CropIcon, Eye, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

type ImagePreviewModalProps = {
  imageUrl: string,
  altText: string,
  imageKey?: string,
  imageId?: string
}

export function ImageCrop ({ imageUrl, altText, imageKey, imageId }: ImagePreviewModalProps) {
  const router = useRouter ()
  const [crop, setCrop] = useState<Crop> ()
  const [loading, setLoading] = useState (false)
  const handleCrop = async () => {
    try {
      // Set loading to true
      await router.refresh ()
    } catch (error) {
      console.log (error)
      toast ({
        title: 'Error',
        description: 'Cannot crop image'
      })
    } finally {
      setLoading (false)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={ 'sm' }>
          <CropIcon className="w-4 h-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={ (e) => {
          e.preventDefault ()
        } }
        className="w-full h-auto">
        <DialogHeader>
          <DialogTitle>
            { altText }
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[80vh] z-10">
          <ReactCrop crop={ crop } onChange={ c => setCrop (c) }>
            <Image
              src={ imageUrl }
              alt={ altText }
              width={ 500 }
              height={ 500 }
              className={ 'w-full rounded-t-md object-cover' }
            />
          </ReactCrop>
        </div>
        <DialogFooter className={ 'gap-2' }>
          <Button
            onClick={ handleCrop }
            size={ 'sm' }
            className={ 'mr-2' }
            disabled={ loading }
          >
            { loading && <Loader2 className="w-4 h-4 animate-spin mr-2"/> }
            Apply
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
