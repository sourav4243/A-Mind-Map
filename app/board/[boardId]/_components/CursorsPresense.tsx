"use client"

import { memo } from "react";

import { useOthersConnectionIds } from "@liveblocks/react";
import { Cursor } from "./Cursor";

const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    );
};

export const CursorPresense = memo(() => {
    return (
        <>
            {/* TODO: Draft Pencil */}
            <Cursors/>
        </>
    );
});

CursorPresense.displayName = "CursorPresense";