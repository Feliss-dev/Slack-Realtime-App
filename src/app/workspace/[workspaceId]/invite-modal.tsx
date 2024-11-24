import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog";

interface InviteModalProps {
        open: boolean;
        setOpen: (open: boolean) => void
}
export const InviteModal = ({open, setOpen}: InviteModalProps) => {
    return (
        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite people to your workspace</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}