import VerticalSlider from "./text-slide"

function Introduction() {
  return (
    <div className="flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
            <p className="font-inter font-bold text-3xl text-[#111] dark:text-neutral-100">Sahil Ahmed</p>
            <VerticalSlider />
        </div>
        <p className="max-w-2xl font-poppins text-sm font-normal text-neutral-500 dark:text-neutral-400">
            A Full-Stack Developer with a solid foundation in building modern applications, with a focus on aesthetics, functionality, and accessibility.
        </p>
    </div>
  )
}

export default Introduction
