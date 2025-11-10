"use client";

import { Info } from "./Info";
import { Participants } from "./Participants";
import { Toolbar } from "./Toolbar";

import { useSelf } from "@liveblocks/react";


interface CanvasProps {
    boardId: string;
}

export const Canvas = ({boardId} : CanvasProps) => {
    const info = useSelf((me) => me.info);
    
    console.log(info);

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info/>
            <Participants/>
            <Toolbar/>
        </main>      
    );
};
