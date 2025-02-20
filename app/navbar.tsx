"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const NavBar = () => {
  const segment = useSelectedLayoutSegment() ?? "";

  const navlinks = [
    {
      isActive: !["favorites", "analytics"].includes(segment),
      label: "Dashboard",
      href: "/",
    },
    {
      isActive: segment == "favorites",
      label: "Favorites",
      href: "/favorites",
    },
    {
      isActive: segment == "analytics",
      label: "Analytics",
      href: "/analytics",
    },
  ];

  return (
    <div>
      {navlinks.map(({ label, href, isActive }) => (
        <Link key={href} href={href}>
          <Button variant="ghost" className={cn({ underline: isActive })}>
            {label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
