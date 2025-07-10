import Profile from "@/assets/profile.png";

function Logo() {
  return (
    <div className="cursor-pointer ring-1 rounded-full p-[2px] ring-neutral-200 dark:ring-neutral-800 hover:ring-neutral-300 dark:hover:ring-neutral-700">
        <img src={Profile} alt="logo" width={35} height={35} className="max-md:w-[30px] max-md:h-[30px]" />
    </div>
  )
}

export default Logo