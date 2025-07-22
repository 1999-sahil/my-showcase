import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/userContext";
import { useTheme, type Theme } from "../theme-provider";
import AccountToggle from "./account-toggle";
import Search from "@/components/sidebar/search";

import {
  Bolt,
  FolderOpenDot,
  Home,
  LogOut,
  Newspaper,
  SquareKanban,
  SquarePen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: Newspaper,
  },
  {
    title: "Notes",
    url: "/admin/notes",
    icon: SquareKanban,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: FolderOpenDot,
  },
  {
    title: "Draft",
    url: "/admin/draft",
    icon: SquarePen,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Bolt,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);
  const { setTheme } = useTheme();
  const location = useLocation();
  const [mounted, setMounted] = useState<boolean>(false);

  const handleThemeChange = (value: string) => {
    if (["dark", "light", "system"].includes(value)) {
      setTheme(value as Theme);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sidebar className="">
      <SidebarHeader className="bg-neutral-50 dark:bg-[#0e100f]/80">
        <div className="w-full mt-2 space-y-3 px-1">
          <AccountToggle />
          <Search />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-neutral-50 dark:bg-[#0e100f]/80">
        <SidebarGroup>
          <SidebarGroupLabel className="font-poppins">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isSelected = location.pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`${isSelected ? "bg-neutral-200/80 dark:bg-neutral-800/50 rounded-md" : "opacity-80"}`}
                  >
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="font-normal font-inter">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-neutral-50 dark:bg-[#0e100f]/80 flex items-center justify-between w-full">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md p-1 cursor-pointer"
          >
            <button className="w-full">
              <AccountToggle />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 font-inter" align="center">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="">GitHub</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <DropdownMenuShortcut>
                <LogOut />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
