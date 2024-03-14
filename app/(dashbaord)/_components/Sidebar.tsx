import {Logo} from "@/app/(dashbaord)/_components/Logo";
import {SidebarRoutes} from "@/app/(dashbaord)/_components/SidebarRoutes";

const Sidebar = () => {
    return (
        <div className={"h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm w-full"}>
            <div className="p-6">
                <Logo/>
            </div>
            <div className={"flex flex-col w-full"}>
                <SidebarRoutes />
            </div>
        </div>
    );
}

export default Sidebar;