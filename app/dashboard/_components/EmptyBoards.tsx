"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const EmptyBoards = () => {
    const router = useRouter();
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const addBoardThroughAPI = () =>{
        if(!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled",
        })
        .then((id)=>{
            toast.success("Board created");
            router.push(`/board/${id}`);
        })
        .catch(()=>{
            toast.error("Failed to create board");
        });
    };

    return (
        <div className="h-full flex flex-col justify-center items-center">
           <Image
                src="/empty-boards.png"
                alt="favorite list empty"
                height={250}
                width={250}
            />
            <h2 className="text-2xl font-semibold mt-2">
                Create your first board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={addBoardThroughAPI} size="lg">
                    {pending ? "Creating.." : "Create Board"}
                </Button>
            </div>
        </div>
    );
};