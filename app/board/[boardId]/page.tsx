import { Room } from "@/components/Room";

import { Canvas } from "./_components/Canvas";
import { Loading } from "./_components/CanvasLoading";
import { use } from "react";

interface BoardIdPageProps {
    params: Promise<{
        boardId: string;
    }>;
};

const BoardIdPage = ({ params } : BoardIdPageProps) => {
    const { boardId } = use(params);
    return (
        <Room roomId={boardId} fallback={<Loading/>}>
            <Canvas boardId={boardId}/>
        </Room>
    );
};

export default BoardIdPage;