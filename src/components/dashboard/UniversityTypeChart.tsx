import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface UniversityTypeChartProps {
	data: Record<string, number>
}

export function UniversityTypeChart({ data }: UniversityTypeChartProps) {
	const chartData = Object.entries(data).map(([name, value]) => ({
		name,
		value,
	}))

	return (
		<Card className='col-span-1'>
			<CardHeader>
				<CardTitle>Universitetlar Turi Bo'yicha Taqsimot</CardTitle>
			</CardHeader>
			<CardContent className='h-[300px]'>
				<ResponsiveContainer width='100%' height='100%'>
					<PieChart>
						<Pie
							data={chartData}
							cx='50%'
							cy='50%'
							labelLine={false}
							label={({ name, percent }) =>
								`${name}: ${((percent as any) * 100).toFixed(0)}%`
							}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
						>
							{chartData.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
