"use client";

import { Info } from "./Info";
import { Participants } from "./Participants";
import { Toolbar } from "./Toolbar";

export const Canvas = () => {
    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info/>
            <Participants/>
            <Toolbar/>
        </main>      
    );
};
