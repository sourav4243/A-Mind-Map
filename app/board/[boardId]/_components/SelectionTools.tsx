"use client";

import { memo } from "react";
import { Trash2 } from "lucide-react";

import { Hint } from "@/components/Hint";
import { Camera, Color } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { useSelf, useMutation } from "@liveblocks/react";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";

import { ColorPicker } from "./ColorPicker";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
};

export const SelectionTools = memo(({
    camera, 
    setLastUsedColor,
}: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const setFill = useMutation((
        { storage },
        fill: Color,
    ) => {
        const liverLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {    // IF any ERROR, LOOK FOR THIS PLACE
            liverLayers.get(id)?.set("fill", fill);
        });
    }, [selection, setLastUsedColor]);

    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width/2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
        <div 
            className="absolute p-3 rounded-xl bg-white shadow-sm border-transparent flex select-none"
            style={{
                transform: `translate(
                    calc(${x}px - 50%),
                    calc(${y-16}px - 100%)            
                )`
            }}    
        >
            <ColorPicker
                onChange={setFill}
            />

            <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
                <Hint label="Delete">
                    <Button
                        variant="board"
                        size="icon"
                        onClick={deleteLayers}
                    >
                        <Trash2/>
                    </Button>
                </Hint>

            </div>
        </div>
    )
});