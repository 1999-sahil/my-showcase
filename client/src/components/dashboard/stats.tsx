import { Binary, TrendingUp } from "lucide-react";

interface StatsProps {
  title: string;
  count: number;
  icon: React.ElementType;
}

function Stats({ title, count, icon: Icon }: StatsProps) {
  return (
    <div className={`${title === "ai" ? "bg-[#111] dark:bg-neutral-100" : "bg-white dark:bg-neutral-900/50"} border rounded-md w-full py-2 px-3 lg:py-3 lg:px-4 space-y-2`}>
      <span className="flex items-center gap-2">
        <Icon className="size-3.5 lg:size-4 text-neutral-500" />
        <h2 className={`font-poppins font-medium capitalize text-sm ${title === "ai" ? "text-neutral-300 dark:text-neutral-800" : "text-neutral-500"}`}>
          {title}
        </h2>
      </span>
      <p className={`font-mono text-3xl text-start flex gap-2 ${title === "ai" ? "text-white dark:text-black" : "text-black dark:text-white"}`}>
        {count}
        {title === "ai" ? <Binary className="size-4 " /> : <TrendingUp className="size-4 text-green-500" />}
      </p>
    </div>
  );
}

export default Stats;
