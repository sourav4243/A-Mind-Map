"use client";

import Image from "next/image"
import Link from "next/link"
import { Poppins } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

export const OrganizationSidebar = () =>{
    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
            <Link href="/dashboard">
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
                        border: "1px solid #E5E7EB",
                        justifyContent:"space-between",
                        backgroundColor: "white", 
                    }
                }
            }}
            />
            
            {/* TODO: Add favorite bar and team board bar  */}
            
        </div>
    )
}