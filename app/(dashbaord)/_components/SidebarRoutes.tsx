"use client"

import {Compass, Layout} from "lucide-react";
import SidebarItem from "@/app/(dashbaord)/_components/SidebarItem";

const guestRoutes = [
    {
        icon: Layout,
        label: "Home",
        href: "/",
        key: "home",
    },
    {
        icon: Compass,
        label: "Explore",
        href: "/search",
        key: "explore",
    }
]

export const SidebarRoutes = () => {
    return (
        <div className={"flex flex-col w-full"}>
            {guestRoutes.map((route) => (
                <SidebarItem
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                    key={route.key}
                />
            ))}
        </div>
    )
}