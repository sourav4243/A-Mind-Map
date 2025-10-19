"use client"

import { EmptyBoards } from "./EmptyBoards";
import { EmptyFavorite } from "./EmptyFavorite";
import { EmptySearch } from "./EmptySearch";

interface BoardListProps {
    ordId: string;
    query: {
        search?: string;
        favorites?: string;
    };
};

export const BoardList = ({ordId, query} : BoardListProps) =>{

    const data = []  // TODO: call API

    if(!data?.length && query.search){
        return(
            <EmptySearch/>
        );
    };

    if(!data?.length && query.favorites){
        return(
            <EmptyFavorite/>
        );
    };

    if(!data?.length){
        return(
            <EmptyBoards/>
        );
    };

    return(
        <div>
            {JSON.stringify(query)};
        </div>
    );
};