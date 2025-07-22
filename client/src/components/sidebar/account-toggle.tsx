import { ChevronsUpDown } from "lucide-react";
import Profile from "@/assets/profile.png";

function AccountToggle() {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="flex items-center gap-2">
        <img src={Profile} alt="avatar" className="size-8" />
        <span className="text-start">
          <h2 className="font-inter text-sm">Sahil Ahmed</h2>
          <h2 className="font-openSans text-xs">sahilahmed466@gmail.com</h2>
        </span>
      </span>
      <ChevronsUpDown className="size-4" />
    </div>
  );
}

export default AccountToggle;
