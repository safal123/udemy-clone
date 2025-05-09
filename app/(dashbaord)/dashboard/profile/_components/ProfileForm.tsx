'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/shared/SubmitButton'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

interface ProfileFormProps {
  data: any,
  postData: any
}

const ProfileForm = ({data, postData}: ProfileFormProps) => {
  const {toast} = useToast ()
  return (
    <div className={ '' }>
      <Card className={ '' }>
        <form action={ async (formData) => {
          await postData (formData)
          toast ({
            title: '🎉 Profile updated successfully',
            description: 'Your profile has been updated successfully.'
          })
        } }>
          <CardHeader>
            <div className={"flex items-center"}>
              <div className={'space-y-2'}>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Your profile settings
                </CardDescription>
              </div>
              <Image
                src={data.imageUri}
                alt={data.firstName}
                width={100}
                height={100}
                className={'rounded-full h-12 w-12 ml-auto'}
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 w-full">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className={ 'space-y-2 w-full' }>
                <div className={ 'space-y-1' }>
                  <Label>
                    First Name
                  </Label>
                  <Input
                    type={ 'text' }
                    className={ 'w-full' }
                    name={ 'firstName' }
                    defaultValue={ data?.firstName ?? undefined }
                    placeholder={ 'Your first name' }
                  />
                </div>
                <div className={ 'space-y-1' }>
                  <Label>
                    Last Name
                  </Label>
                  <Input
                    type={ 'text' }
                    className={ 'w-full' }
                    name={ 'lastName' }
                    placeholder={ 'Your last name' }
                    defaultValue={ data?.lastName ?? undefined }
                  />
                </div>
                <div className={ 'space-y-1' }>
                  <Label>Your email address</Label>
                  <Input
                    type={ 'email' }
                    disabled
                    className={ 'w-full' }
                    name={ 'email' }
                    placeholder={ 'Your Email' }
                    defaultValue={ data?.email }
                  />
                  <p className={ 'text-muted-foreground text-xs' }>
                    You cannot update your email address.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton
              defaultText={ 'Save'}
              isSubmitting={ false }
              savingText={ 'Saving...'}
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default ProfileForm
