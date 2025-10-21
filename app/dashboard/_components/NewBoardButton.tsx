"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
};

export const NewBoardButton = ({orgId, disabled}: NewBoardButtonProps) => {

    const { mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId, 
            title: "Untitled"
        })
        .then((id)=>{
            toast.success("Board created");
            // TODO: redirect to board/{id}
        })
        .catch(()=>{
            toast.error("Failed to create board");
        });
    }

    return (
        <Button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-black rounded-lg hover:bg-black/90 flex flex-col items-center justify-center h-full",
                (pending || disabled) && "opacity-75 cursor-not-allowed"
            )}
        >
            <div/>
            <Plus className="h-12 w-12 size-1 text-white stroke-1"/>
            <p className="text-sm text-white font-medium">
                New board
            </p>
        </Button>        
    );
};