import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface InviteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
}
export const InviteModal = ({
  open,
  setOpen,
  name,
  joinCode,
}: InviteModalProps) => {
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useNewJoinCode();

  const handleNewCode = () => {
    mutate(
      { workspaceId },
      {
        onSuccess: () => {
          toast.success("New invite code created");
        },
        onError: () => {
          toast.error("Error creating invite code");
        },
      }
    );
  };

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Copied to clipboard"));
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
          <DialogDescription>
            Use the code below to invite to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-center py-10">
          <p className="text-4xl font-bold tracking-widest uppercase">
            {joinCode}
          </p>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            Copy link
            <CopyIcon className="size-4 ml-2" />
          </Button>
        </div>
        <div className=" flex items-center justify-between w-full">
          <Button disabled={isPending} onClick={handleNewCode} variant="outline">
            New code
            <RefreshCcw className="size-4 ml-2" />
          </Button>

          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
