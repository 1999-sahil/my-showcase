interface VectorProps {
    title: string;
};

function Vector({ title }: VectorProps) {
  return (
    <div className="border bg-neutral-200/50 dark:bg-neutral-900/50 flex flex-col items-start relative h-fit w-fit px-2 py-[2px]">
          <Icon className="absolute h-3 w-3 -top-1.5 -left-1.5 dark:text-neutral-500/50 text-neutral-500/50" />
          <Icon className="absolute h-3 w-3 -bottom-1.5 -left-1.5 dark:text-neutral-500/50 text-neutral-500/50" />
          <Icon className="absolute h-3 w-3 -top-1.5 -right-1.5 dark:text-neutral-500/50 text-neutral-500/50" />
          <Icon className="absolute h-3 w-3 -bottom-1.5 -right-1.5 dark:text-neutral-500/50 text-neutral-500/50" />

          <h2 className="text-[#333] dark:text-neutral-300 font-inter font-normal text-sm">
            {title}
          </h2>
        </div>
  )
}

const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default Vector