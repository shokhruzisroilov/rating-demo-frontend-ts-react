'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

interface TopUniversity {
	rank: number
	universityName: string
	universityCode: string
	region: string
	compositeScore: number
	rankChange: number
}

interface TopUniversitiesTableProps {
	data: TopUniversity[]
}

export function TopUniversitiesTable({ data }: TopUniversitiesTableProps) {
	const getRankChangeIcon = (change: number) => {
		if (change > 0) return <ArrowUp className='h-4 w-4 text-green-500' />
		if (change < 0) return <ArrowDown className='h-4 w-4 text-red-500' />
		return <Minus className='h-4 w-4 text-gray-500' />
	}

	return (
		<Card className='col-span-2'>
			<CardHeader>
				<CardTitle>Top Universitetlar</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[80px]'>O'rin</TableHead>
							<TableHead>Universitet</TableHead>
							<TableHead>Kod</TableHead>
							<TableHead>Hudud</TableHead>
							<TableHead className='text-right'>Umumiy Ball</TableHead>
							<TableHead className='text-right'>O'zgarish</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map(university => (
							<TableRow key={university.universityCode}>
								<TableCell className='font-medium'>
									<div className='flex items-center gap-2'>
										<span className='text-lg font-bold'>
											#{university.rank}
										</span>
										{getRankChangeIcon(university.rankChange)}
									</div>
								</TableCell>
								<TableCell>
									<div className='font-medium'>{university.universityName}</div>
								</TableCell>
								<TableCell>{university.universityCode}</TableCell>
								<TableCell>{university.region}</TableCell>
								<TableCell className='text-right font-bold'>
									{(university.compositeScore ?? 0).toFixed(1)}
								</TableCell>
								<TableCell className='text-right'>
									<span
										className={`font-medium ${
											university.rankChange > 0
												? 'text-green-600'
												: university.rankChange < 0
													? 'text-red-600'
													: 'text-gray-600'
										}`}
									>
										{university.rankChange > 0 ? '+' : ''}
										{university.rankChange}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
