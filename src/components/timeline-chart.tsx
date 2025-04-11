'use client';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, Cell } from 'recharts';

const chartData = [
  { time: '00:00', value: 100, color: '#FF69B4' },
  { time: '00:30', value: 100, color: '#9370DB' },
  { time: '01:00', value: 100, color: '#FFA07A' },
  { time: '02:00', value: 100, color: '#FFD700' },
  { time: '03:00', value: 100, color: '#9370DB' },
];

const chartConfig = {
  value: {
    label: 'Value',
    color: '#FF69B4',
  },
} satisfies ChartConfig;

export function TimelineChart() {
  return (
    <ChartContainer
      className="min-h-[100px] max-h-[100px] w-full"
      config={chartConfig}
    >
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          className="font-semibold"
          dataKey="time"
          tickLine={false}
          axisLine={false}
        />
        <Bar dataKey="value" radius={4}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
