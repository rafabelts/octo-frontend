import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieGraph(props: { chartData: any }) {
  return (
    <div className="mt-2">
      {props.chartData.labels.length > 0 ? (
        <Pie data={props.chartData} />
      ) : (
        'Loading...'
      )}
    </div>
  );
}
