import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getDashboardCourses } from '@/actions/get-dashboard-courses'
import CourseCard from '@/components/shared/CourseCard'
import IconBadge from '@/components/shared/IconBadge'
import { CheckCircle, CircleCheck, Clock, Clock3Icon } from 'lucide-react'
import InfoCard from '@/components/shared/InfoCard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default async function Dashboard () {
  const {userId} = auth ()
  if (!userId) {
    return redirect ('/login')
  }

  const {completedCourses, coursesInProgress} = await getDashboardCourses (userId)

  return (
    <div className={ 'container mx-auto py-12' }>
      <div className={ 'mb-8' }>
        <div className={ 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4' }>
          <InfoCard
            title={ 'Courses Completed' }
            description={ `${ completedCourses.length } courses` }
            icon={ CheckCircle }
          />
          <InfoCard
            title={ 'Courses in Progress' }
            description={ `${ coursesInProgress.length } courses` }
            icon={ Clock }
          />
        </div>
      </div>
      <div className={ 'mb-8' }>
        <Card>
          <CardHeader>
            <div className={ 'flex items-center' }>
              <IconBadge icon={ Clock3Icon }/>
              <h2 className={ 'text-2xl font-bold text-gray-800 dark:text-gray-100 ml-2' }>Courses in Progress</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className={ 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3' }>
              { coursesInProgress.length > 0 ? coursesInProgress.map (course => (
                  <div key={ course.id }>
                    <CourseCard course={ course as any }/>
                  </div>
                )) :
                <div className={ 'text-gray-500 dark:text-gray-400 text-lg' }>
                  No courses in progress
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </div>
      <div className={ 'mb-8' }>
        <Card>
          <CardHeader>
            <div className={ 'flex items-center' }>
              <IconBadge icon={ CheckCircle }/>
              <h2 className={ 'text-2xl font-bold text-gray-800 dark:text-gray-100 ml-2' }>Completed Courses</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className={ 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3' }>
              { completedCourses.length > 0 ? completedCourses.map (course => (
                  <div key={ course.id }>
                    <CourseCard course={ course as any }/>
                  </div>
                )) :
                <div className={ 'text-gray-500 dark:text-gray-400 text-lg' }>
                  No completed courses
                </div>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
