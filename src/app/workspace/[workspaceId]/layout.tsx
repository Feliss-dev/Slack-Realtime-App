"use client";

import React from "react";
import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps{
    children: React.ReactNode;
}
const WorkspaceLayout = ({children}: WorkspaceIdLayoutProps) => {
    return (
        <div className="h-full">
            <Toolbar/>
            {children}
        </div>
    );
};

export default WorkspaceLayout;