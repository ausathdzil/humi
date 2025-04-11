'use client';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, Cell } from 'recharts';

const chartData = [
  { time: '00:00', value: 100, color: '#8b5cf6' },
  { time: '00:30', value: 100, color: '#ec4899' },
  { time: '01:00', value: 100, color: '#3b82f6' },
  { time: '02:00', value: 100, color: '#6366f1' },
  { time: '03:00', value: 100, color: '#8b5cf6' },
];

const chartConfig = {
  value: {
    label: 'Value',
    color: '#8b5cf6',
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
