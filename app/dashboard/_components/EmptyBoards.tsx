import Image from "next/image";
import { Button } from "@/components/ui/button";

export const EmptyBoards = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
           <Image
                src="/empty-boards.png"
                alt="favorite list empty"
                height={250}
                width={250}
            />
            <h2 className="text-2xl font-semibold mt-2">
                Create your first board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};