import React from 'react'
import { checkTeacherRole } from '@/actions/check-teacher-role'
import { redirect } from 'next/navigation'

const TeacherLayout = async ({children}: any) => {
  const {user} = await checkTeacherRole ()
  if (!user) {
    redirect ('/')
    return
  }
  return <>
    { children }
  </>
}

export default TeacherLayout
