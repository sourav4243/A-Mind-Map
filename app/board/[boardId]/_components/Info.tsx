"use client"
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useQuery } from "convex/react";
import { Roboto } from "next/font/google";

import { Hint } from "@/components/Hint";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Actions } from "@/components/Actions";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";


interface InfoProps {
    boardId: string;
};

const font = Roboto({
    subsets: ["latin"],
    weight: ["400"]
});

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    );
};


export const Info = ({boardId}: InfoProps) => {

    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get,{
        id: boardId as Id<"boards">
    });

    if(!data) return <InfoSkeleton/>

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to dashboard" side="bottom" sideOffset={5}>
                <Link href="/dashboard/" className="hover:scale-102 transition-transform">
                    <Image src="/logo.png" width={145} height={50} alt="The Flow Mind Logo"/>
                </Link>
            </Hint>
            <TabSeparator/>
            <Hint label="Edit title" side="bottom" sideOffset={5}>
                <Button 
                    variant="board" 
                    className={`${font.className} text-base font-normal px-2 hover:cursor-pointer`}
                    onClick={() => onOpen(data._id, data.title)}
                    >
                    {data.title}
                </Button>
            </Hint>
            <TabSeparator/>
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={5}
            >
                <div> 
                    <Hint label="Main menu" side="bottom" sideOffset={5}>
                        <Button size="icon" variant="board">
                            <Menu/>
                        </Button>
                    </Hint>
                </div>

            </Actions>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"/>
    );
};