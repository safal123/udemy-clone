import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/format'

interface DataCardProps {
  value: number,
  label: string,
  shouldFormat?: boolean
}

const DataCard
  = ({ value, label, shouldFormat}: DataCardProps) => {
  return (
    <Card className={"dark:bg-black"}>
      <CardHeader className={ 'flex flex-row items-center justify-between space-y-0 pb-2' }>
        <CardTitle
          className={ 'text-lg font-bold' }
        >
          { label }
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={ 'text-2xl font-bold text-primary' }>
          { shouldFormat ? formatPrice(value) : value }
        </p>
      </CardContent>
    </Card>
  )
}

export default DataCard
