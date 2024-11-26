import dynamic from 'next/dynamic'
import { platform } from 'os';
import Quill from 'quill';

import React, { useRef } from 'react'

const Editor = dynamic(() => import("@/components/ui/editor"), { ssr: false });

interface ChatInputProps {
  placeholder?: string;
}

export const ChatInput = ({placeholder}: ChatInputProps) => {
  const editorRef = useRef<Quill | null>(null);

  
  return (
    <div className='px-5 w-full'>
        <Editor 
        placeholder={placeholder}
        onSubmit={()=> {}}
        disabled={false}
        innerRef={editorRef}
        />
        </div>
  )
}
