"use client"

import * as React from "react";
import type { Usable } from "react";
import { EmptyOrg } from "./_components/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";
import { BoardList } from "./_components/BoardList";

interface QueryParams {
  search?: string;
  favorites?: string;
}

interface DashboardPageProps{
    searchParams: Usable<QueryParams>;
};

const Page = ({
    searchParams,
} : DashboardPageProps) =>{
    const {organization} = useOrganization();

const params = React.use(searchParams) as QueryParams;
  const search = params?.search;
  const favorites = params?.favorites;


    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? (
            <EmptyOrg/> 
            ) : (
                <BoardList
                    orgId = {organization.id}
                    query={{
                        search: search,
                        favorites: favorites,
                    }}
                />
            )}
        </div>
    )
}

export default Page;