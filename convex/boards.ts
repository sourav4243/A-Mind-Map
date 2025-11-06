import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string())
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        // Favorite boards page
        if(args.favorites){
            const favoriteBoards = await context.db
                .query("userFavorites")
                .withIndex("by_user_org", (q) => 
                    q
                        .eq("userId", identity.subject)
                        .eq("orgId", args.orgId)
                )
                .order("desc")
                .collect();
            
            const ids = favoriteBoards.map((b) => b.boardId);

            const boards = await getAllOrThrow(context.db, ids);

            return boards.map((board) => ({
                ...board,
                isFavorite: true,
            }));
        }


        const title = args.search as string;    // search title
        let boards = [];

        if(title){
            boards = await context.db
                .query("boards")
                .withSearchIndex("search_title", (q) => 
                    q
                        .search("title", title)
                        .eq("orgId", args.orgId)
                )
                .collect()
        }else{
            boards = await context.db
                .query("boards")
                .withIndex("by_org", (q)=> q.eq("orgId", args.orgId))
                .order("desc")
                .collect();
        }


        const boardsWithFavoriteRelation = boards.map((board) => {
            return context.db
                .query("userFavorites")
                .withIndex("by_user_board", (q) => 
                    q
                        .eq("userId", identity.subject)
                        .eq("boardId", board._id)
                )
                .unique()
                .then((favorite) => {
                    return {
                        ...board,
                        isFavorite: !!favorite,
                    };
                });
        });
        const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation)
        return boardsWithFavoriteBoolean;
    },
});