import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BtnViewAllProps {
  text: string;
  href: string;
}

function BtnViewAll({ text, href }: BtnViewAllProps) {
  return (
    <Link to={href}>
      <button className="text-sm font-poppins font-normal text-[#333] dark:text-neutral-300 hover:text-[#111] dark:hover:text-white hover:underline cursor-pointer flex items-center gap-2">
        {text}
        <MoveRight className="size-4" />
      </button>
    </Link>
  );
}

export default BtnViewAll;
