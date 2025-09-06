"use client"
import { OrganizationSwitcher, SignInButton, UserButton, useOrganization} from "@clerk/nextjs"
import {SearchInput} from "./SearchInput"
import { Unauthenticated } from "convex/react"
import { Button } from "@/components/ui/button"
import InviteButton from "./InviteButton"


export const Navbar = () =>{
    const { organization } = useOrganization()
    return(
        <div className="flex items-center gap-x-4 p-5">
            {/* Large screen */}
            <div className="hidden lg:flex lg:flex-1 ">
                <SearchInput/>
            </div>

            {/* Phone */}
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher 
                    hidePersonal
                    appearance={{
                        elements:{
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems:"center",
                                width: "100%",
                                maxWidth: "376px",
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
            </div>

            {/* Invite Button */}
            {organization && <InviteButton/> }

            <Unauthenticated>
                <SignInButton mode='modal'>
                <Button variant={"outline"}>
                    Log in
                </Button>
                </SignInButton>
            </Unauthenticated>
            <UserButton
                appearance={{
                    elements:{
                        userButtonAvatarBox:{
                            width: "35px",
                            height: "35px",
                        }
                    }
                }}
            />
        </div>
    )
}