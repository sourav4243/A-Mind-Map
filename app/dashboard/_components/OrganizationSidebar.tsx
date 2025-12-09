"use client";

import Image from "next/image"
import Link from "next/link"
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import {useSearchParams} from "next/navigation";

export const OrganizationSidebar = () =>{

    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites"); 

    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
            <Link href="/">
                <div>
                    <Image src="/logo.png" width={145} height={50} alt="The Flow Mind Logo"/>
                </div>
            </Link>
            <OrganizationSwitcher 
            hidePersonal
            appearance={{
                elements:{
                    rootBox: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems:"center",
                        width: "100%",
                    },

                    organizationSwitcherTrigger:{
                        padding: "6px",
                        width: "100%",
                        borderRadius:"8px",
                        border: "1px solid #e4e4ec",
                        justifyContent:"space-between",
                        backgroundColor: "white", 
                    }
                }
            }}
            />
            
            {/* TODO: Add favorite bar and team board bar  */}
            <div className="space-y-1 w-full">
                <Button
                    variant={favorites? "ghost": "secondary"}
                    size="lg"
                    asChild
                    className="font-normal justify-start px-2 w-full transition-all border-[1px] border-[#e4e4ec]"
                >
                    <Link href="/dashboard">
                        <LayoutDashboard className="h-4 w-4 mr-2"/>
                        Team Boards
                    </Link>
                </Button>

                <Button
                    variant={favorites? "secondary": "ghost"}
                    size="lg"
                    asChild
                    className="font-normal justify-start px-2 w-full transition-all border-[1px] border-[#e4e4ec]"
                >
                    <Link href={{
                        pathname: "/dashboard",
                        query:{ favorites: true}
                    }}>
                        <Star className="h-4 w-4 mr-2"/>
                        Favorite Boards
                    </Link>
                </Button>
            </div>
        </div>
    )
}