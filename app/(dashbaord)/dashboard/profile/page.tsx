import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import ProfileForm from '@/app/(dashbaord)/dashboard/profile/_components/ProfileForm'

const getData = (userId: string) => {
  return db.user.findUnique ({
    where: {
      userId
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      userId: true
    }
  })
}

const SettingPage = async () => {
  const {userId} = auth ()
  if (!userId) {
    return
  }
  const data = await getData (userId)

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
