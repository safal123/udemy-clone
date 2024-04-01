"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from "react";
import {AiFillDelete} from "react-icons/ai";
import {FaArrowCircleRight} from "react-icons/fa";
import {TiDelete} from "react-icons/ti";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({children, onConfirm}: ConfirmModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className={"font-bold text-xs"}>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
            <TiDelete className={"h-6 w-6"}/>
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={"bg-theme hover:bg-theme/90"}>
            Continue
            <FaArrowCircleRight className={"h-5 w-5 ml-2 text-white"}/>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmModal
