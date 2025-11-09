import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
    const authorization = await auth();
    const user = await currentUser();

    console.log("AUTH_INFO", {
        authorization,
        user,
    });

    if(!authorization || !user){
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();
    const board = await convex.query(api.board.get, {id: room});

    console.log("AUTH_INFO", {
        room,
        board,
        boardOrgId: board?.orgId,
        userOrgId: authorization.orgId
    });

    if(board?.orgId !== authorization.orgId){
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName,
        picture: user.imageUrl,
    };

    console.log({userInfo});

    // Start an auth session inside your endpoint
    const session = liveblocks.prepareSession(
        user.id,
        { userInfo: userInfo }
    );

    if(room){
        session.allow(room, session.FULL_ACCESS);
    }

    // Authorize the user and return the result
    const { status, body } = await session.authorize();
    console.log({status, body}, "ALLOWED");
    return new Response(body, { status });
}