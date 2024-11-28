import { useCreateMessage } from '@/features/messages/api/use-create-message';
import { useChannelId } from '@/hooks/use-channel-id';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import dynamic from 'next/dynamic'
import { platform } from 'os';
import Quill from 'quill';

import React, { useRef, useState } from 'react'
import { toast } from 'sonner';

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

interface ChatInputProps {
  placeholder?: string;
}

export const ChatInput = ({placeholder}: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<Quill | null>(null);

  const [isPending, setIsPending] = useState(false);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
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
  }
  }
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
