import React from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "./navigation/navigationSidebar";
import ServerSidebar from "./server/serverSidebar";

const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <div className=" md:hidden">
        {/* make it md:hidden */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent/90">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 flex gap-0">
          <div className="flex h-full">
          <div className="w-[72px]">
          <NavigationSidebar />
        </div>
          <ServerSidebar serverId={serverId} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileToggle;