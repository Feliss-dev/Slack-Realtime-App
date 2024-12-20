import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { useGetMember } from "../api/use-get-member";
import { ChevronDown, Loader, MailIcon, TriangleAlert, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useUpdateMember } from "../api/use-update-member";
import { useRemoveMember } from "../api/use-remove-member";
import { useCurrentMember } from "../api/use-current-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


interface ProfileProps {
    memberId: Id<"members">;
    onClose: () => void;
};

export const Profile = ({
    memberId,
    onClose
}: ProfileProps) => {
    const workspaceId = useWorkspaceId();
    const {data: currentMember, isLoading: isLoadingCurrentMember} = useCurrentMember({workspaceId});

    const {data: member, isLoading: isLoadingMember} = useGetMember({id: memberId});
    const {mutate: updateMember, isPending: isUpdatePending} = useUpdateMember();
    const {mutate: removeMember, isPending: isRemovePending} = useRemoveMember();
    const router = useRouter();

    const [LeaveDialog, confirmLeave] = useConfirm(
      "Leave workspace?",
      "Are you sure you want to leave this workspace?",
    );

    const [RemoveDialog, confirmRemove] = useConfirm(
      "Remove memeber?",
      "Are you sure you want to do this?",
    );

    const [UpdateDialog, confirmUpdate] = useConfirm(
      "Update role?",
      "Are you sure you want to do this?",
    );

    const onRemove = async () => {

      const ok = await confirmRemove();
      if(!ok) return;
      removeMember({ id: memberId}, {
        onSuccess: () => {
          toast.success("Member removed");
          onClose();
        },
        onError: () => {
          toast.error("Failed to remove member");
        }
      })
    }

    const onLeave = async () => {
      const ok = await confirmLeave();
      if(!ok) return;
      removeMember({ id: memberId}, {
        onSuccess: () => {
          router.replace("/");
          toast.success("You left the workspace");
          onClose();
        },
        onError: () => {
          toast.error("Failed to leave workspace");
        }
      })
    };

    const onUpdate = async (role: "admin" | "member") => {
      const ok = await confirmUpdate();
      if(!ok) return;
      updateMember({ id: memberId, role}, {
        onSuccess: () => {
          toast.success("Role updated");
          onClose();
        },
        onError: () => {
          toast.error("Failed to change role");
        }
      })
    };


    if (isLoadingMember || isLoadingCurrentMember) {
        return (
          <div className="h-full flex flex-col ">
            <div className="h-[49px] flex justify-between items-center px-4 border-b">
              <p className="text-lg font-bold">Threads</p>
              <Button onClick={onClose} size="iconSm" variant="ghost">
                <XIcon className="size-5 stroke-[1.5]" />
              </Button>
            </div>
            <div className="flex flex-col gap-y-2 h-full items-center justify-center">
              <Loader className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Message not found</p>
            </div>
          </div>
        );
      }
    
      if (!member) {
        return (
          <div className="h-full flex flex-col ">
            <div className="h-[49px] flex justify-between items-center px-4 border-b">
              <p className="text-lg font-bold">Profile</p>
              <Button onClick={onClose} size="iconSm" variant="ghost">
                <XIcon className="size-5 stroke-[1.5]" />
              </Button>
            </div>
            <div className="flex flex-col gap-y-2 h-full items-center justify-center">
              <TriangleAlert className="size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Profile not found</p>
            </div>
          </div>
        );
      }
    const avatarFallback = member.user.name?.[0] ?? "?";

    return(
      <>
      <RemoveDialog/>
      <LeaveDialog/>
      <UpdateDialog/>
        <div className="h-full flex flex-col ">
        <div className="h-[49px] flex justify-between items-center px-4 border-b">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size="iconSm" variant="ghost">
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex flex-col p-4 items-center justify-center">
        
            <Avatar className=" rounded-md ">
              <AvatarImage className="max-w-[256px] max-h-[256px] size-full" 
              src={member.user.image}
              />
              <AvatarFallback className="aspect-square text-6xl">
                    {avatarFallback}
              </AvatarFallback>
            </Avatar>
          
        </div>
        <div className="flex flex-col p-4">
            <p className="text-xl font-bold">{member.user.name}</p>
            {currentMember?.role === "admin" && currentMember?._id !== memberId ? (
              <div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>

              <Button variant="outline" className="w-full capitalize" >
                {member.role} <ChevronDown className="size-4 ml-2"/>
              </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                     value={member.role}
                     onValueChange={(role) => onUpdate(role as "admin" | "member")}
                    >
                      <DropdownMenuRadioItem value="admin">
                        Admin

                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="member">
                        Member

                      </DropdownMenuRadioItem>
                      
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>

                </DropdownMenu>

              <Button variant="outline" className="w-full " onClick={ onRemove}>
                Remove
              </Button>
              </div>
            ): currentMember?._id === memberId && currentMember?.role !== "admin" ? (
              <div className="mt-4">
                <Button variant="outline" className="w-full " onClick={ onLeave}>
                Leave
              </Button>
              </div>
            ): null}
        </div>
        <Separator/>
        <div className="flex flex-col p-4">
            <p className="text-sm font-bold mb-4"> Contact information</p>
            <div className="flex items-center gap-2">
                <div className="size-9 rounded-md bg-muted flex items-center">
                    <MailIcon className="size-4"/>
                </div>
                <div className="flex flex-col">
                    <p className="text-[13px] font-semibold text-muted-foreground">
                        Email Address
                    </p>
                    <Link
                        href={`mailto:${member.user.email}`}
                        className="text-sm hover:underline text-blue-500"
                    >
                    {member.user.email}
                    </Link>
                </div>
            </div>
        </div>
      </div>
      </>
    )
}