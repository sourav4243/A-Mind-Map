import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { OrganizationProfile } from "@clerk/nextjs";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#e4e4ec]">
          <Plus className="h-4 w-4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-transparent border-none p-0 max-w-[700px] flex justify-center items-center">
        <DialogTitle>
          <p className="hidden">Invite members</p>
        </DialogTitle>

        <OrganizationProfile
          routing="hash"
        //   appearance={{
        //     elements: {
        //       rootBox: {
        //         display: "flex",
        //         justifyContent: "center",
        //         alignItems: "center",
        //         width: "100%",
        //         minBlockSize: "500px"
        //       }
        //     },
        //   }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
