import { ModeToggle } from "../mode-toggle"

function Mode() {
  return (
    <div className="flex sticky top-[calc(100vh_-_16px_-_8px)] flex-col border-t px-2 border-stone-300 dark:border-stone-800 justify-end text-xs">
        <div className="flex items-center justify-between">
            <span className="font-normal font-inter">Appearance</span>
            <ModeToggle />
        </div>
    </div>
  )
}

export default Mode