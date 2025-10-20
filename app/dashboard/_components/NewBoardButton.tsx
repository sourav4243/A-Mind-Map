"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

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
    }

    return (
        <Button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-black rounded-lg hover:bg-black/90 flex flex-col items-center justify-center py-6 h-full",
                (pending || disabled) && "opacity-75"
            )}
        >
            <div/>
            <Plus className="h-12 w-12 text-white stroke-1"/>
            <p className="text-sm text-white font-light">
                New board
            </p>
        </Button>        
    );
};