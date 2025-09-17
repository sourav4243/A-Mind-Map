import Image from "next/image"

export const EmptyOrg = () =>{
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-org.png"
                alt="Empty-Organization"
                height = {200}
                width = {200}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Welcome to The Flow Mind
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Create an Organization to get started
            </p>
        </div>
    )
}