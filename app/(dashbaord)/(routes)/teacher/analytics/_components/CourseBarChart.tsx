'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card } from '@/components/ui/card'

const CourseBarChart = (data: any) => {
  return (
    <Card className={ 'dark:bg-black p-2' }>
      <ResponsiveContainer width="100%" height={ 350 }>
        <BarChart data={ data.data }>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={ 12 }
            tickLine={ false }
            axisLine={ false }
          />
          <YAxis
            stroke="#888888"
            fontSize={ 12 }
            tickLine={ false }
            axisLine={ false }
            tickFormatter={ (value) => `$${ value }` }
          />
          <Bar
            dataKey="total"
            fill="currentColor"
            width={ 20 }
            radius={ [4, 4, 0, 0] }
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default CourseBarChart
