import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import ProfileForm from '@/app/(dashbaord)/dashboard/profile/_components/ProfileForm'
import TeacherRequestForm from '@/app/(dashbaord)/dashboard/profile/_components/TeacherRequestForm'
import { hasRequestedTeacherAccess } from '@/actions/request-teacher-access'

const getData = async () => {
  const user = await currentUser ()
  if (!user) return

  return db.user.findUnique ({
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

  const {hasRequested} = await hasRequestedTeacherAccess ({userId: data?.userId as string})

  return <div className={ 'grid lg:grid-cols-2 gap-2 p-4' }>
    <ProfileForm data={ data } postData={ postData }/>
    <TeacherRequestForm
      hasRequested={ hasRequested }
      userId={ data?.userId as string }
    />
  </div>
}

export default SettingPage
