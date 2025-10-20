"use client";

import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";

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
            </div>
        </Link>
    );
};