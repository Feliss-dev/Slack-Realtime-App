import { useCreateMessage } from '@/features/messages/api/use-create-message';
import { useGenerateUploadUrl } from '@/features/upload/api/use-generate-upload-url';
import { useChannelId } from '@/hooks/use-channel-id';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import dynamic from 'next/dynamic'
import { platform } from 'os';
import Quill from 'quill';

import React, { useRef, useState } from 'react'
import { toast } from 'sonner';
import { Id } from '../../../../../../convex/_generated/dataModel';

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

interface ChatInputProps {
  placeholder?: string;
}

type createMessageValues = {
  channelId: Id<"channels">;
  workspaceId: Id<"workspaces">;
  body: string;
  image?: Id<"_storage"> | undefined;
};

export const ChatInput = ({placeholder}: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);

  const [isPending, setIsPending] = useState(false);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const {mutate: generateUploadUrl} = useGenerateUploadUrl();
  const {mutate: createMessage} = useCreateMessage();

  const handleSubmit = async ({
    body,
    image
  }: {
    body: string;
    image: File | null;
  }) => {
   try{
    setIsPending(true);

    editorRef?.current?.enable(false);

    const values: createMessageValues = {
      channelId,
      workspaceId,
      body,
      image: undefined,
    };
    
    if(image){
      const url = await generateUploadUrl({}, {throwError: true});

      console.log({url});

      if(!url){
        throw new Error("Failed to generate upload url");
      }

      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": image.type },
        body: image,
      });

      if(!result.ok){
        throw new Error("Failed to upload file");
      }
      const {storageId} = await result.json();

      values.image = storageId;
    }

    await createMessage({
      workspaceId,
      channelId,
      body,
    
    }, {throwError: true});
    setEditorKey((prevKey) => prevKey + 1);
  }catch(error){
    toast.error("Error sending message");
  }finally{
    setIsPending(false);
    editorRef?.current?.enable(true);
  }
  };
  return (
    <div className='px-5 w-full'>
        <Editor 
        key={editorKey}
        placeholder={placeholder}
        onSubmit={handleSubmit}
        disabled={isPending}
        innerRef={editorRef}
        />
        </div>
  )
}
