import { Menu } from 'lucide-react'
import { Chapter, Course, UserProgress } from '@prisma/client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import CourseSidebar from '@/app/(courses)/courses/[courseId]/_components/CourseSidebar'


interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    }) []
  },
}

export const CourseMobileSidebar =
  ({
     course,
   }: CourseMobileSidebarProps) => {
    return (
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu/>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
          <CourseSidebar
            course={ course }
          />
        </SheetContent>
      </Sheet>
    )
  }
