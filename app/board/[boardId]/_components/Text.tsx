import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

const calculateFontSizeBasedOnBoxSize = (width: number, height: number) => {
    const maxFontSize = 56;
    const minFontSize = 20;
    const scaleFactor = 0.3;
    
    const scaled = Math.min(width, height) * scaleFactor;
    return Math.min(maxFontSize, Math.max(minFontSize, scaled));
};

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string ) => void;
    selectionColor?: string;
};

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: TextProps) => {
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
                outline: selectionColor? `1px solid ${selectionColor}` : "none"
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                    font.className
                )}
                style={{
                    fontSize: calculateFontSizeBasedOnBoxSize(width, height),
                    color: fill? colorToCss(fill): "#000",
                }}
            />
        </foreignObject>
    )
}