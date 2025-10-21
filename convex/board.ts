import { v } from "convex/values";

import { mutation } from "./_generated/server";

const images = [
    "/placeholders/image1.png",
    "/placeholders/image2.png"
];

export const create = mutation({
    // args which are required when create a new board
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await context.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,     // ! is added to tell trust me bro, you think name is null but it will not be null
            imageUrl: randomImage
        });

        return board;
    }
})