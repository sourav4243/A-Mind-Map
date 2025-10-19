import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
           <Image
                src="/empty-search.png"
                alt="favorite list empty"
                height={200}
                width={200}
            />
            <h2 className="text-2xl font-semibold mt-4">
                No results found!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try searching for something else
            </p>
        </div>
    );
};