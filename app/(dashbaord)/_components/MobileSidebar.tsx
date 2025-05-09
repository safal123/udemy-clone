import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Sidebar from "@/app/(dashbaord)/_components/Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className={"lg:hidden pr-4 hover:opacity-75"}>
        <Menu/>
      </SheetTrigger>
      <SheetContent side={"left"} className={"bg-white p-0"}>
        <Sidebar/>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar;
