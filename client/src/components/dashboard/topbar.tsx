import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../mode-toggle";
import { Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Topbar() {
  const location = useLocation();
  // Get the pathname and split it into segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Get the last segment
  const lastSegment = pathSegments[pathSegments.length - 1];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 lg:gap-3">
        <SidebarTrigger size="sm" />
        <div
          data-orientation="vertical"
          role="none"
          data-slot="separator"
          className="bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px mx-2 data-[orientation=vertical]:h-4"
        ></div>
        <span className="font-inter capitalize font-medium">{lastSegment}</span>
      </div>
      <div className="flex items-center gap-1">
        <Link
          to=""
          className="inline-flex items-center justify-center gap-2 rounded-md size-8 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <FaGithub />
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Topbar;
