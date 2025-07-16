import Vector from "../vector";
import BtnViewAll from "../btn-viewall";

function FeaturedProjects() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Vector title="Featured Projects" />
        <BtnViewAll text="View all" href="/projects" />
      </div>
      <p className="font-poppins text-sm font-normal text-neutral-500 dark:text-neutral-400">
        I love building things. Some of the side projects I'm currently worked
        on:
      </p>

      <div>projects</div>
    </div>
  );
}

export default FeaturedProjects;
