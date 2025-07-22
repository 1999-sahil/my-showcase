import { Search as SearchIcon } from "lucide-react"

function Search() {
  return (
    <>
      <div className="relative bg-stone-300/50 dark:bg-neutral-900 mb-4 rounded-md flex items-center px-2 py-2 text-sm">
        <SearchIcon className="mr-2 size-4 text-[#333] dark:text-neutral-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full text-xs font-mono bg-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none"
        />
        <span className="p-[2px] text-[8px] font-inter flex gap-0.5 items-center shadow bg-stone-50 dark:bg-black rounded absolute right-1.5 top-1/2 -translate-y-1/2">
          ⌘K
        </span>
      </div>
      {/** Command Menu */}
    </>
  )
}

export default Search