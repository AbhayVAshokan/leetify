"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "next-intl/client";
import { i18n } from "../../i18n-config";

const NavBar = () => {
  const segment = useSelectedLayoutSegment() ?? "";
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();

  const navlinks = [
    {
      isActive: !["favorites", "analytics"].includes(segment),
      label: t("home"),
      href: "/",
    },
    {
      isActive: segment == "favorites",
      label: t("favorites"),
      href: "/favorites",
    },
    {
      isActive: segment == "analytics",
      label: t("analytics"),
      href: "/analytics",
    },
  ];

  const handleLocaleChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <div>
      {navlinks.map(({ label, href, isActive }) => (
        <Link key={href} href={href}>
          <Button variant="ghost" className={cn({ underline: isActive })}>
            {label}
          </Button>
        </Link>
      ))}
      {i18n.locales.map((locale) => (
        <Button
          key={locale}
          variant="ghost"
          onClick={() => handleLocaleChange(locale)}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

export default NavBar;
