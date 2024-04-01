"use client"

import {BarChart, Compass, Layout, List} from "lucide-react";
import SidebarItem from "@/app/(dashbaord)/_components/SidebarItem";
import {usePathname} from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
    key: "home",
  },
  {
    icon: Compass,
    label: "Explore",
    href: "/dashboard/search",
    key: "explore",
  }
]

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
    key: "courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
    key: "analytics",
  }
]

export const SidebarRoutes = () => {
  const pathName = usePathname()

  const isTeacherPage = pathName?.startsWith("/teacher")

  const routes = isTeacherPage ? teacherRoutes : guestRoutes

  return (
    <div className={"flex flex-col w-full"}>
      {routes.map((route) => (
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
