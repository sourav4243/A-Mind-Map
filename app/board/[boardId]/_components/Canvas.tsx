"use client";

import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
import { LiveObject } from "@liveblocks/node";

import { 
    useHistory, 
    useCanUndo, 
    useCanRedo,
    useMutation,
    useStorage,
    useOthersMapped,
} from "@liveblocks/react";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";

import { Info } from "./Info";
import { Participants } from "./Participants";
import { Toolbar } from "./Toolbar";
import { LayerPreview } from "./LayerPreview"; 
import { CursorPresense } from "./CursorsPresense";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({boardId} : CanvasProps) => {

    const layerIds = useStorage((root) => root.layerIds);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    })

    const [camera, setCamera] = useState<Camera>({x:0, y:0})
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 113,
        g: 23,
        b: 83,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    // Function to insert layer on canvas
    const insertLayer = useMutation((
        { storage, setMyPresence }, 
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
        position: Point,
    ) => {
        const liveLayers = storage.get("layers");
        if(liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();

        // new layer:
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            // height: layerType === LayerType.Text ? 500: 100,         // We can do like this to add diff size for diff type of layer
            height: 100,
            width: 100,
            fill: lastUsedColor,
        })

        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
    }, [lastUsedColor]);

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }));
    }, []);

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera)

        setMyPresence({ cursor: current });
    }, []);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    // when pointer is up, call insertLayer() function
    const onPointerUp = useMutation((
        {},
        e
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if ( canvasState.mode === CanvasMode.Inserting ) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            })
        }

        history.resume();
    },
    [
        camera,
        canvasState,
        history,
        insertLayer 
    ]);

    const selections = useOthersMapped((otherUser) => otherUser.presence.selection);

    const layerIdsToColorSelection = useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};

        for (const user of selections) {
            const [connectinoId, selection] = user;

            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] = connectionIdToColor(connectinoId);
            }
        } 

        return layerIdsToColorSelection;
    }, [selections]);

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId}/>
            <Participants/>
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canUndo={canUndo}
                canRedo={canRedo}
                undo={history.undo}
                redo={history.redo}
            />

            {/* svg is scalable vector graphics coontainer. shapes never blur on zoom.. as vector based, not pixel images*/}
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                {/* g tag is for grouping */}
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    {layerIds?.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown = { ()=> {} }
                            selectionColor = {layerIdsToColorSelection[layerId]}
                        />
                    ))}
                    <CursorPresense/>
                </g>
            </svg>
        </main>      
    );
};
