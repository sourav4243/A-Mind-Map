"use client"
import {Plus} from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import {
    Dialog, 
    DialogContent,
    DialogTrigger,
    DialogTitle
} from "@/components/ui/dialog"

import { useRouter } from "next/navigation";
import { Hint } from "@/components/Hint";
import { useState } from "react";



export const NewButton =()=>{
    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint 
                        label="Create Organization"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white"/>
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>

            <DialogContent className="w-fit h-fit p-0 border-none bg-transparent max-w-[480px]">
                <DialogTitle><p className="hidden">Create Organization</p></DialogTitle>
                <CreateOrganization/>
            </DialogContent>
        </Dialog>
    )
}