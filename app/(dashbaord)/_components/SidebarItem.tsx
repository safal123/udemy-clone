import {LucideIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

interface SidebarItemProps {
    icon: LucideIcon
    label: string
    href: string
}

const SidebarItem = ({icon: Icon, label, href}: SidebarItemProps) => {
    const pathName = usePathname()
    const router = useRouter()

    const isActive =
        (pathName === "/" && href === "/") ||
        pathName === href ||
        pathName.startsWith(`${href}/`)

    const onClick = () => {
        router.push(href)
    }

    return (
        <button
            onClick={onClick}
            className={cn("flex items-center gap-x-2 hover:text-slate-600 hover:bg-slate-300/20 text-slate-500 text-sm font-[500]",
                isActive && "text-sky-700 bg-sky-200/20",
            )}>
            <div className={"flex items-center gap-x-2 p-4 rounded-md"}>
                <Icon size={22} className={cn("text-slate-500", isActive && "text-sky-700")}/>
                {label}
            </div>
            <div className={cn("ml-auto border-2 opacity-0 border-sky-700 h-full transition-all",
                isActive && "opacity-100")}
            />
        </button>
    )
}

export default SidebarItem