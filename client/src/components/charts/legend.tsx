import type { LegendProps, LegendPayload } from "recharts";

const CustomLegend = ({ payload }: LegendProps) => {
  if (!payload) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 space-x-2">
      {payload.map((entry: LegendPayload, index: number) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs font-inter text-[#333] dark:text-neutral-400">
            {/* Use entry.payload.tag if available, fallback to entry.value */}
            {(entry.payload as any).tag || entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
