"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Course} from ".prisma/client";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, MoreHorizontal, Pencil} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {formatPrice} from "@/lib/format";


export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const title = row.getValue("title") as string
      const {id} = row.original
      return (
        <Link href={`/teacher/courses/${id}`}>
          <span className={"text-blue-600 font-semibold"}>
            {title}
          </span>
        </Link>
      )
    }
  },
  {
    accessorKey: "price",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const price = row.getValue("price") as number
      return (
        <span className={"ml-4"}>
          {formatPrice(price)}
          {
            row.original.price === null ||
            row.original.price === 0 ?
              <Badge variant={"default"} className={"ml-2"}>Free</Badge> :
              null
          }
        </span>
      )
    }
  },
  {
    accessorKey: "isPublished",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const isPublished = row.getValue("isPublished") as boolean
      return (
        <Badge
          variant={isPublished ? "default" : "outline"}
          className={"ml-6"}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({row}) => {
      const {id} = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <span className={"sr-only"}>Open menu</span>
              <MoreHorizontal className={"h-5 w-5"}/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className={"h-4 w-4 mr-2"}/>
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
