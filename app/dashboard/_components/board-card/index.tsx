"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/Actions";
import { MoreHorizontal } from "lucide-react";

import { Overlay } from "./Overlay";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/button";

interface BoardCardProps {
    id: string,
    title: string,
    imageUrl: string,
    authorId: string, 
    authorName: string,
    createdAt: number,
    orgId: string,
    isFavorite: boolean,
};

export const BoardCard = ({
    id, title, imageUrl, authorId, authorName, createdAt, orgId, isFavorite
}: BoardCardProps) => {

    const { userId } = useAuth();
    const authorLabel = userId === authorId? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border border-gray-200 rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-white">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-contain"
                    />
                    <Overlay/>
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal
                                className="text-white opacity-75 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={()=>{}}
                    disabled={false}
                />
            </div>
        </Link>
    );
};


BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <div className="h-full w-full flex flex-col p-3 gap-y-2">
                <Skeleton className="w-full flex-1" />
                <div className="flex justify-between">
                    <div className="flex flex-col w-full">
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[50%] mt-1" />
                    </div>
                    <div>
                        <Skeleton className="rounded-full h-8 w-8"/>
                    </div>
                </div>
            </div>
        </div>
    )
}