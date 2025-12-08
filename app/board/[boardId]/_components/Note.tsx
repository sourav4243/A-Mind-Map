import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { NoteLayer } from "@/types/canvas";
import { cn, colorToCss, getConstrastingTextColor } from "@/lib/utils";
import { useMutation } from "@liveblocks/react";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

const calculateFontSizeBasedOnBoxSize = (width: number, height: number) => {
    const maxFontSize = 56;
    const minFontSize = 20;
    const scaleFactor = 0.15;
    
    const scaled = Math.min(width, height) * scaleFactor;
    return Math.min(maxFontSize, Math.max(minFontSize, scaled));
};

interface NoteProps {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string ) => void;
    selectionColor?: string;
};

export const Note = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: NoteProps) => {
    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation((
        { storage },
        newValue: string,
    ) => {
        const liveLayers = storage.get("layers");

        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) =>  onPointerDown(e, id)}
            style={{
                outline: selectionColor? `1.5px solid ${selectionColor}` : "none",
            }}
            className="shadow-md drop-shadow-xl"
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center outline-none",
                    font.className
                )}
                style={{
                    fontSize: calculateFontSizeBasedOnBoxSize(width, height),
                    color: fill? getConstrastingTextColor(fill): "#000",
                    backgroundColor: fill ? colorToCss(fill) : "#000",
                }}
            />
        </foreignObject>
    )
}