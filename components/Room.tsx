"use client";

import { ReactNode } from "react";

import {   
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense, 
} from "@liveblocks/react";

interface RoomProps {
    children: ReactNode;
    roomId: string;
    fallback: NonNullable<ReactNode> | null;
}

export const Room = ({
    children,
    roomId,
    fallback,
 }: RoomProps) => {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16}>
            <RoomProvider id={roomId} initialPresence={{cursor: null}}>
                <ClientSideSuspense fallback={fallback}>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
