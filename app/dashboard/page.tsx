"use client"

import React from "react";
import { EmptyOrg } from "./_components/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";

const page = () =>{
    const {organization} = useOrganization();
    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? <EmptyOrg/> : (<p>Board List!</p>) }
        </div>
    )
}

export default page;