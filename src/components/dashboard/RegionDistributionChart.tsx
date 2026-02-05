import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

interface RegionDistributionChartProps {
	data: Record<string, number>
}

export function RegionDistributionChart({
	data,
}: RegionDistributionChartProps) {
	const chartData = Object.entries(data)
		.filter(([key]) => key !== 'string' && key !== 'fdsafasfas') // Filter out invalid keys
		.map(([region, count]) => ({
			region,
			count,
		}))
		.sort((a, b) => b.count - a.count)

	return (
		<Card className='col-span-1'>
			<CardHeader>
				<CardTitle>Hududlar Bo'yicha Taqsimot</CardTitle>
			</CardHeader>
			<CardContent className='h-[300px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='region' angle={-45} textAnchor='end' height={60} />
						<YAxis />
						<Tooltip />
						<Bar dataKey='count' fill='#8884d8' />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
