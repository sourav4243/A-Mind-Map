"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
    // AuthLoading,
    Authenticated,
    ConvexReactClient,
    Unauthenticated,
} from "convex/react"

// import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps{
    children: React.ReactNode;
}

const converUrl  = process.env.NEXT_PUBLIC_CONVEX_URL!;

// a convex instance:
const convex = new ConvexReactClient(converUrl);

// children is prop and ConvexClientProviderProps is type
export const ConvexClientProvider = ({children, }: ConvexClientProviderProps)=>{
    return(
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Unauthenticated>
                    {children}
                </Unauthenticated>
                {/* {children} */}
                {/* <AuthLoading>
                    <Loading/>
                </AuthLoading> */}
                <Authenticated>
                    {children}
                </Authenticated>
                
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}