import Image from "next/image"
import { CreateOrganization } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent, 
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

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
            <div className="mt-6">
                <Dialog>
                    <DialogTitle hidden={true}>Create Organization</DialogTitle>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px] w-fit">
                        <CreateOrganization/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}