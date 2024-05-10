import { getAnalytics } from '@/actions/get-analytics'
import { auth } from '@clerk/nextjs'
import DataCard from '@/app/(dashbaord)/(routes)/teacher/analytics/_components/DataCard'
import CourseBarChart from '@/app/(dashbaord)/(routes)/teacher/analytics/_components/CourseBarChart'


const AnalyticsPage = async () => {
  const {userId} = auth ()
  if (!userId) return
  const {totalRevenue, totalSales, data} = await getAnalytics (userId)
  return (
    <div className={ 'p-6' }>
      <div className="grid cols-1 md:grid-cols-2 gap-4">
        <DataCard
          value={ totalRevenue }
          label={ 'Total Revenue' }
          shouldFormat={ true }
        />
        <DataCard
          value={ totalSales }
          label={ 'Total Sales' }
        />
      </div>
      <div className={ 'mt-6' }>
        <CourseBarChart
          data={ data }
        />
      </div>
    </div>
  )
}

export default AnalyticsPage
