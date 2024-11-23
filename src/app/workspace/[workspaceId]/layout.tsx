"use client";

import React from "react";
import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";


interface WorkspaceIdLayoutProps{
    children: React.ReactNode;
}
const WorkspaceLayout = ({children}: WorkspaceIdLayoutProps) => {
    return (
        <div className="h-full">
            <Toolbar/>
            <div className="flex h-[calc(100vh-40px)] ">
                <Sidebar/>
            {children}
            </div>
        </div>
    );
};

export default WorkspaceLayout;