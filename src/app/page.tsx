"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Loader } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log("Redirect to workspace");
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {isLoading ? (
        <div className="flex flex-col items-center space-y-4">
          <Loader className="size-10 animate-spin text-blue-500" />
          <p className="text-gray-500">Đang tải workspace...</p>
        </div>
      ) : (
        <>
          {workspaceId ? (
            <p className="text-gray-600">Chuyển hướng đến workspace...</p>
          ) : (
            <p className="text-gray-600">Bạn chưa có workspace nào, vui lòng tạo mới.</p>
          )}
          <UserButton />
        </>
      )}
    </div>
  );
}
