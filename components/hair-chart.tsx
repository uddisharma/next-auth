'use client'

import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface HairChartProps {
    data: number[]
    labels: string[]
    title: string
}

export function HairChart({ data, labels, title }: HairChartProps) {
    const chartData = {
        labels,
        datasets: [
            {
                label: title,
                data,
                borderColor: '#1E2A4A',
                backgroundColor: 'rgba(30, 42, 74, 0.1)',
                tension: 0.4,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return <Line data={chartData} options={options} />
}

