import { Unplug } from "lucide-react";

function Error() {
  return (
    <div className="w-[300px] h-fit m-auto min-h-screen flex flex-col items-center justify-center gap-3">
      <Unplug className="w-12 h-12 text-[#333] dark:text-neutral-300" />
      <h2 className="text-3xl font-inter font-semibold text-[#333] dark:text-neutral-300">
        Oops!
      </h2>
      <p className="text-center font-inter font-normal text-sm text-neutral-500 dark:text-neutral-400">
        Something's gone wrong, but don't worry we're trying to fix it.
      </p>
    </div>
  );
}

export default Error;
