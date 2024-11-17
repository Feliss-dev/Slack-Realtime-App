"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import {useAuthActions} from "@convex-dev/auth/react"
import { useEffect, useMemo } from "react";

export default function Home() {


  const  {data, isLoading} = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if(isLoading) return;

    if(workspaceId){
      console.log("Redirect to workspace")
    }else{
      console.log("Open creation modal")
    }
  }, [workspaceId, isLoading]);
  return (
    <div>
      
      <UserButton />
    </div> 
  )
}
