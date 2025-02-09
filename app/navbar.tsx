"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const NavBar = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <div>
      {/* TODO: This shows a brief blank page. Adding /abhayvashokan instead is much faster.*/}
      <Link href="/">
        <Button
          variant="ghost"
          className={cn({ underline: segment !== "favorites" })}
        >
          Dashboard
        </Button>
      </Link>
      <Link href="/favorites">
        <Button
          variant="ghost"
          className={cn({ underline: segment == "favorites" })}
        >
          Favorites
        </Button>
      </Link>
    </div>
  );
};

export default NavBar;
