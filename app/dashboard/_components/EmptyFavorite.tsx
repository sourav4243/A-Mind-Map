import Image from "next/image";

export const EmptyFavorite = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <Image
                // src="/favorite-empty-state.png"
                src="/empty-favorite.png"
                alt="favorite list empty"
                height={200}
                width={200}
            />
            <h2 className="text-2xl font-semibold mt-4">
                No Favorites boards!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try favoriting a board
            </p>
        </div>
    )
}