"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";

import { Overlay } from "./Overlay";
import { Footer } from "./Footer";

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