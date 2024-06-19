"use client"

import {Category} from ".prisma/client"
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic, FcNeutralTrading,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode
} from 'react-icons/fc'
import {IconType} from "react-icons";
import {CategoryItem} from "@/app/(dashbaord)/dashboard/search/_components/CategoryItem";

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
  "Music" : FcMusic,
  "Photography" : FcOldTimeCamera,
  "Fitness" : FcSportsMode,
  "Accounting" : FcSalesPerformance,
  "Computer Science" : FcMultipleDevices,
  "Film" : FcFilmReel,
  "Engineering" : FcEngineering,
  "Other": FcNeutralTrading
}

export const Categories = ({items}: CategoriesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
}
