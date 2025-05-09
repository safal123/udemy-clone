'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent, DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { CropIcon, Eye, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { uploadCroppedImage } from '@/actions/media'

type ImagePreviewModalProps = {
  imageUrl: string,
  altText: string,
  imageKey?: string,
  imageId?: string
}

export function CropImageModal ({ imageUrl, altText, imageKey, imageId }: ImagePreviewModalProps) {
  const router = useRouter ()
  const [crop, setCrop] = useState<Crop> ()
  const [loading, setLoading] = useState (false)
  const imageRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const getCroppedImageBlob = (crop: Crop): Promise<Blob | null> => {
    return new Promise<Blob | null>((resolve) => {
      if (!crop || !imageRef.current) return resolve(null);

      const image = imageRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio || 1;

      // Crop dimensions adjusted for natural image size
      const cropX = crop.x * scaleX;
      const cropY = crop.y * scaleY;
      const cropWidth = crop.width * scaleX;
      const cropHeight = crop.height * scaleY;

      // Canvas dimensions for high DPI screens
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(crop.width * pixelRatio);
      canvas.height = Math.round(crop.height * pixelRatio);

      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      // Draw cropped portion of the image
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 1);
    });
  };

  const handleCrop = async () => {
    try {
      setLoading (true)
      if (!crop) return;
      const croppedBlob = await getCroppedImageBlob(crop);
      if (croppedBlob) {
        // originalUrl
        const file = new File([croppedBlob],
          `${altText}-cropped.jpg`,
          { type: "image/jpeg" }
        );

        // Upload to your API route
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadCroppedImage({
          formData,
          originalUrl: imageUrl,
        })
        console.log(response)
      }
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
          <DialogDescription>
            Crop the image to the desired size.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 overflow-y-auto max-h-[80vh] z-10">
          <ReactCrop
            keepSelection
            aspect={16/9}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <Image
              ref={imageRef}
              src={imageUrl}
              alt={altText}
              width={500}
              height={500}
              className="w-full rounded-t-md object-cover"
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
