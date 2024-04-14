'use client'

import { useState } from 'react'
import FileUpload from '@/components/shared/FileUpload'

const ProfileImageUploader = () => {
  const [image, setImage] = useState ('')

  const onSubmit = async (values: any) => {
    console.log (values)
  }

  return (
    <FileUpload
      endpoint={ 'profileImage' }
      onChange={ (url) => {
        if (url) {
          setImage (url)
        }
      } }
    />
  )
}

export default ProfileImageUploader
