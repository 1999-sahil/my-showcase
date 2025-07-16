import BtnViewAll from "../btn-viewall";
import Vector from "../vector";

function Blogs() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Vector title="My Blogs" />
        <BtnViewAll text="View all" href="/blogs" />
      </div>
      <p className="font-poppins text-sm font-normal text-neutral-500 dark:text-neutral-400">
        Sharing Knowledge as I learn
      </p>

      <div>blogs</div>
    </div>
  );
}

export default Blogs;
