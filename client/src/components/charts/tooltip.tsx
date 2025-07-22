interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;

    return (
      <div className="bg-white dark:bg-neutral-900 border px-3 py-1.5 rounded text-xs">
        <p className="font-inter font-medium capitalize text-[#333] dark:text-neutral-300">{data.tag}</p>
        <p className="font-mono text-neutral-500 dark:text-neutral-400">
          Count: <span className="text-green-500">{payload[0].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
