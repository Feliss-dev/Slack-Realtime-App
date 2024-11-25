import React, { useEffect, useRef } from 'react'
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";

const Editor = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const options: QuillOptions = {
            theme: "snow",
        }
    }, []);
  return (
    <div className="flex flex-col">
        <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm bg-white">
            <div>Editor</div>
        </div>
    </div>
  )
}

export default Editor;