import { Link } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface TopProjectsProps {
  projectName: string;
  liveUrl: string;
  repoUrl: string;
  id: string;
}

function TopProjects({
  projectName,
  liveUrl,
  repoUrl,
  id,
}: TopProjectsProps) {
  
  return (
    <tr className="border-b">
      <td className="p-3 text-xs font-mono hidden lg:block">
        {id}
      </td>
      <td className="p-3 text-xs font-poppins font-medium text-[#111] dark:text-neutral-200">
        {projectName}
      </td>

      <td className="p-3 text-sm">
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Link className="size-4" />
        </a>
      </td>
      <td className="p-3 text-sm">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <FaGithub className="size-4" />
        </a>
      </td>
    </tr>
  );
}

export default TopProjects;
