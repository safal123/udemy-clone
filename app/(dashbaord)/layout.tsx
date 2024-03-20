import React from "react"
import Sidebar from "@/app/(dashbaord)/_components/Sidebar";
import MobileSidebar from "@/app/(dashbaord)/_components/MobileSidebar";
import {NavbarRoutes} from "@/components/ui/shared/NavbarRoutes";

const DashboardLayout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className={"h-full"}>
            <div className={"h-[80px] md:pl-56 fixed w-full inset-y-0 z-50"}>
                <div className={"flex items-center justify-between h-full p-4 border-b bg-white shadow-sm"}>
                    <MobileSidebar/>
                    <NavbarRoutes/>
                </div>
            </div>
            <div className={"h-full hidden md:flex w-56 fixed inset-y-0 z-50"}>
                <Sidebar/>
            </div>
            <main className={"md:pl-56 pt-[80px]"}>
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout
