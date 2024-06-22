'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cancelTeacherAccessRequest, requestTeacherAccess } from '@/actions/request-teacher-access'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

type TeacherRequestFormProps = {
  userId: string,
  hasRequested: boolean,
}

const TeacherRequestForm = ({userId, hasRequested}: TeacherRequestFormProps) => {
  const router = useRouter ()
  const {toast} = useToast ()
  const [isRequesting, setIsRequesting] = useState (false)
  const [isCancelling, setIsCancelling] = useState (false)

  const handleTeacherRequestAccess = async () => {
    try {
      setIsRequesting (true)
      const test = await requestTeacherAccess ({userId})
      router.refresh ()
      toast ({
        title: '🎉 Request submitted successfully',
        description: 'Your request has been submitted successfully. It may take up to 24 hours to review your'
      })
    } catch (error) {
      toast ({
        title: '🚨 Error submitting request',
        description: 'There was an error submitting your request. Please try again later.',
        variant: 'destructive'
      })
      console.error ('[REQUEST_TEACHER_ACCESS]', error)
    } finally {
      setIsRequesting (false)
    }
  }

  const handleTeacherRequestAccessCancel = async () => {
    try {
      setIsCancelling (true)
      const test = await cancelTeacherAccessRequest ({userId})
      router.refresh ()
      toast ({
        title: '🎉 Request cancelled successfully',
        description: 'Your request has been cancelled successfully.'
      })
    } catch (error) {
      console.error ('[REQUEST_TEACHER_ACCESS]', error)
      toast ({
        title: '🚨 Error cancelling request',
        description: 'There was an error cancelling your request. Please try again later.',
        variant: 'destructive'
      })
    } finally {
      setIsCancelling (false)
    }
  }
  return <div>
    <Card>
      <CardHeader>
        <CardTitle className={'text-lg leading-6 font-medium text-gray-900 dark:text-gray-400'}>
          Request access for teacher role
        </CardTitle>
        <CardDescription>
          <div className={ 'mt-2 text-sm leading-5 text-gray-500 dark:text-gray-400' }>
            Your request will be reviewed by the admin.
            Once approved, you will be able to access the teacher dashboard.
            It may take up to 24 hours to review your request.
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        { hasRequested ?
          <>
            <div className={ 'flex flex-col' }>
              <div className={ 'md:block rounded-md bg-indigo-50 p-4 mb-2 mb-4 dark:bg-indigo-900' }>
                <div className={ 'text-sm text-indigo-700 dark:text-indigo-300' }>
                  Your request has been submitted successfully. It may take up
                  to 24 hours to review your request.
                </div>
              </div>
            </div>
            <Button disabled={ isCancelling } onClick={ handleTeacherRequestAccessCancel }>
              { isCancelling && <Loader2 className={ 'h-4 w-4 animate-spin mr-2' }/> }
              Cancel Request
            </Button>
          </>
          :
          <Button
            disabled={ isRequesting }
            onClick={ handleTeacherRequestAccess }
          >
            { isRequesting && <Loader2 className={ 'h-4 w-4 animate-spin mr-2' }/> }
            Request Access
          </Button>
        }
      </CardContent>
    </Card>
  </div>
}

export default TeacherRequestForm
