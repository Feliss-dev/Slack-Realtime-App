import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";


import { FaChevronDown } from "react-icons/fa";
interface HeaderProps {
  memberName?: string;
  memberImage?: string;
  onClick?: () => void;
}

export const Header = ({ memberName, memberImage, onClick }: HeaderProps) => {
 const avatarFallback = memberName?.charAt(0).toUpperCase();
  return (
    <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
     
      <Button variant="ghost"
          className="text-lg font-semibold px-2 overflow-hidden w-auto"
          size="sm"
          onClick={onClick}
          >
            <Avatar>
              <AvatarImage src={memberImage}/>
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>

            <span className="truncate">
                {memberName}
            </span>
            <FaChevronDown className="size-4 ml-1" />

      </Button>
    </div>
  );
};
