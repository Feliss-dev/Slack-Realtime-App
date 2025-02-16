import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { motion } from "framer-motion"; // Import thư viện animation

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-20 w-20">
        <Avatar className="size-12 animate-pulse">
          <AvatarFallback className="bg-gray-300 text-md rounded-md flex items-center justify-center">
            <Loader className="size-6 animate-spin text-gray-500" />
          </AvatarFallback>
        </Avatar>
        <span className="text-sm text-gray-500 mt-2">Loading...</span>
      </div>
    );
  }

  if (!data) return null;

  const { image, name } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  const handleLogout = () => {
    setIsLoggingOut(true); // Bắt đầu hiệu ứng fade-out
    setTimeout(() => signOut(), 500); // Đợi 0.5s trước khi logout
  };

  return (
    <motion.div
      animate={{ opacity: isLoggingOut ? 0 : 1, scale: isLoggingOut ? 0.9 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative cursor-pointer">
          <Avatar className="size-10 hover:opacity-75 transition">
            <AvatarImage className="rounded-md" src={image}></AvatarImage>
            <AvatarFallback className="bg-sky-500 text-md rounded-md flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" side="right" className="w-60">
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer hover:bg-red-100 hover:text-red-600 h-10 flex items-center transition-all"
          >
            <LogOut className="size-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};
