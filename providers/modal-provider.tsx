"use client";

import { useEffect, useState } from "react";

import { RenameModal } from "@/components/modals/rename-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    // return only if in client side, ie if mounted already
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // dont render any modal if not mounted ( ie if still in server side task: mounting)
    if(!isMounted) {
        return null;
    }

    return (
        <>
            <RenameModal/>
        </>
    )
}