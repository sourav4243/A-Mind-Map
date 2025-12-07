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
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from "@/types/canvas";

import { Info } from "./Info";
import { Participants } from "./Participants";
import { Toolbar } from "./Toolbar";
import { LayerPreview } from "./LayerPreview"; 
import { CursorPresense } from "./CursorsPresense";
import { SelectionBox } from "./SelectionBox";
import { STORE_KEY_PANEL_SIZE_PREFIX } from "next/dist/next-devtools/dev-overlay/shared";

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


    // translate layer logic
    const translateSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Translating) {
            return;
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        }

        const liveLayers = storage.get("layers");

        for (const id of self.presence.selection) {
            const layer = liveLayers.get(id);

            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y, 
                })
            }
        }

        setCanvasState({ mode: CanvasMode.Translating, current: point});
    }, [canvasState]);

    const unselectLayers = useMutation((
        {self, setMyPresence}
    ) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: [] }, { addToHistory: true });
        }
    }, []);

    // resize logic
    const resizeSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Resizing) {
            return;
        }

        const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point);

        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0]);

        if (layer) {
            layer.update(bounds);
        }
    }, [canvasState]);


    // Called when user presses on a resize handle of selection box
    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,
    ) => {

        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner,
        });
    }, [history]);

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }));
    }, []);

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera)

        if (canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayer(current);
        } else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current);
        }

        setMyPresence({ cursor: current });
    }, [camera, canvasState, resizeSelectedLayer, translateSelectedLayer]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);


    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Inserting) {
            return;
        }

        // TODO: Add case for drawing

        setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    }, [camera, canvasState.mode, setCanvasState]);

    // when pointer is up, call insertLayer() function
    const onPointerUp = useMutation((
        {},
        e
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);
        if ( canvasState.mode === CanvasMode.Pressing || canvasState.mode === CanvasMode.None) {
            unselectLayers();
            setCanvasState({
                mode: CanvasMode.None,
            });
        } else if ( canvasState.mode === CanvasMode.Inserting ) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }

        history.resume();
    },
    [
        camera,
        canvasState,
        history,
        insertLayer,
        unselectLayers,
    ]);

    // A function to allow selecting any layer/shape
    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string,
    ) => {
        if (
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Inserting
        ) {
            return;
        }

        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);

        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId]}, {addToHistory: true});
        }
        setCanvasState({ mode: CanvasMode.Translating, current: point});
    }, [
        setCanvasState, 
        camera,
        history, 
        canvasState.mode,
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
                onPointerDown={onPointerDown}
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
                            onLayerPointerDown = {onLayerPointerDown}
                            selectionColor = {layerIdsToColorSelection[layerId]}
                        />
                    ))}

                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />

                    <CursorPresense/>
                </g>
            </svg>
        </main>      
    );
};
