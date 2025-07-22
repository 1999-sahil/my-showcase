import CustomPieChart from "../charts/pie-chart";

interface BlogTagInsightsProps {
  tagUsage: TagUsage[];
}

interface TagUsage {
  tag: string;
  name: string;
  count: number;
}

interface TagCloudProps {
  tags: TagUsage[];
}

const COLORS = [
  "#FFBF00",
  "#FF7518",
  "#F08000",
  "#FFAA33",
  "#FFA500",
  "#FFC000",
  "#FF7F50",
];

const TagCloud = ({ tags }: TagCloudProps) => {
  const maxCount = Math.max(...tags.map((tag) => tag.count), 1);

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {tags.map((tag, index) => {
        const fontSize = 8 + (tag.count / maxCount) * 5;
        return (
          <span
            key={index}
            className="font-openSans border px-3 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[#333] dark:text-neutral-400"
            style={{ fontSize: `${fontSize}px` }}
          >
            #{tag.tag}
          </span>
        );
      })}
    </div>
  );
};

function BlogTagInsights({ tagUsage }: BlogTagInsightsProps) {
  const processedData = (() => {
    if (!tagUsage) return [];

    const sorted = [...tagUsage].sort((a, b) => (b.count - a.count));
    const topFive = sorted.slice(0, 5);
    const others = sorted.slice(5);
    const othersCount = others.reduce((sum, item) => sum + item.count, 0);

    const finalData = topFive.map((item) => ({
      ...item,
      tag: item.tag || "",
    }));

    if (othersCount > 0) {
      finalData.push({
        count: othersCount,
        tag: "Others",
        name: "Others"
      });
    }

    return finalData;
  })();

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 md:col-span-7">
        <CustomPieChart colors={COLORS} data={processedData} />
      </div>
      <div className="col-span-12 md:col-span-5">
        <TagCloud
          tags={
            tagUsage.slice(0, 15).map((item) => ({
              ...item,
              name: item.tag || "",
            })) || []
          }
        />
      </div>
    </div>
  );
}

export default BlogTagInsights;
