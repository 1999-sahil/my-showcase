import BtnViewAll from "../btn-viewall";
import Vector from "../vector";

function Work() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Vector title="Work Experience" />
        <BtnViewAll text="View all" href="/about" />
      </div>
      <p className="font-poppins text-sm font-normal text-neutral-500 dark:text-neutral-400">
        Worked with a reputated organizations
      </p>

      <div>work</div>
    </div>
  );
}

export default Work;
