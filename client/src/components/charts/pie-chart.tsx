import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./tooltip";
import CustomLegend from "./legend";

interface TagUsage {
  name: string;
  count: number;
  tag: string;
}

interface PieChartProps {
  data: TagUsage[];
  colors: string[];
}

function CustomPieChart({ colors, data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300} className="flex">
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={80}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell=${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          content={
            <CustomLegend
            />
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart;
