import {Logo} from "@/app/(dashbaord)/_components/Logo";
import {SidebarRoutes} from "@/app/(dashbaord)/_components/SidebarRoutes";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className={"h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm w-full"}>
      <div className="p-3.5 flex items-center justify-center">
        <Link href={"/"}>
          <Logo/>
        </Link>
      </div>
      <div className={"flex flex-col w-full"}>
        <SidebarRoutes/>
      </div>
    </div>
  );
}

export default Sidebar;
