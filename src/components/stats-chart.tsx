import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

interface StatsChartProps {
    dataPoints: number[];
    labels: string[];
}

export default function StatsChart({ dataPoints, labels }: StatsChartProps) {
    const data = {
        labels,
        datasets: [
            {
                label: 'Aktywność użytkowników',
                data: dataPoints,
                fill: false,
                borderColor: '#4f46e5',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="w-full h-full">
            <Line data={data} />
        </div>
    );
}
