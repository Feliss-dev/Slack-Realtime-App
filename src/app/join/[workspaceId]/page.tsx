"use client";

import Image from "next/image";
import VerificationInput from "react-verification-input";
import OtpInput from "react-otp-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { Loader } from "lucide-react";
import { useJoin } from "@/features/workspaces/api/use-join";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface JoinPageProps {
  params: {
    workspaceId: string;
  };
}

const JoinPage = ({ params }: JoinPageProps) => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();

  const [otp, setOtp] = useState("");
  
  const {mutate, isPending} = useJoin();

  const {data, isLoading} = useGetWorkspaceInfo({id: workspaceId});

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);

  useEffect(() => {
    if(isMember){
      router.push(`/workspace/${workspaceId}`);
    }
  },[isMember, router, workspaceId]);

  const handleComplete = (value: string) => {
    mutate({workspaceId, joinCode: value},
      {
        onSuccess: (id) => {
          router.replace(`/workspace/${id}`);
          toast.success("Joined workspace");
      },
      onError: () => {
        toast.error("Error joining workspace");
      },
    
    }
    
    );
  }

  if(isLoading){
    return (
      <>
      <div className="h-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground"/>

      </div>
      </>
    )
  }



  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8">
      <Image src="/file.svg" width={60} height={60} alt="file icon" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join "{data?.name}"</h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <OtpInput
          
          value={otp} // Bind OTP state to the component
          onChange={(value) => {
            setOtp(value); // Cập nhật trạng thái OTP
            if (value.length === 6) { // Kiểm tra nếu OTP đầy đủ
              handleComplete(value); // Gọi hàm xử lý khi hoàn thành
            }
          }}// Handle changes in OTP input
          shouldAutoFocus={true}
          numInputs={6} // Number of OTP input fields
          renderSeparator={<span className="mx-1" />} // Separator between OTP inputs
           containerStyle={cn("flex gap-x-2", { "opacity-50 cursor-not-allowed": isPending })} // Style for the OTP container
          inputStyle="uppercase h-auto rounded-md border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500 bg-gray-200 border border-pink-500" // Input field style
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
