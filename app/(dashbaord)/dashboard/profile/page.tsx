import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'
import ProfileForm from '@/app/(dashbaord)/dashboard/profile/_components/ProfileForm'

const getData = async () => {
  const user = await currentUser ()
  if (!user) return

  return  db.user.findUnique ({
    where: {
      userId: user.id
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      userId: true,
      imageUri: true
    }
  })
}

const SettingPage = async () => {
  const data = await getData ()

  async function postData (formData: FormData) {
    'use server'
    if (!data?.userId) {
      return
    }

    await db.user.update ({
      where: {
        userId: data.userId
      },
      data: {
        firstName: formData.get ('firstName') as string,
        lastName: formData.get ('lastName') as string
      }
    })
  }

  return <ProfileForm data={ data } postData={ postData }/>
}

export default SettingPage
