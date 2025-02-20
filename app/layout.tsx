import type { Metadata } from "next";
import { Inter, Style_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { cn } from "@/lib/utils";
import NavBar from "./navbar";

// Import global utils.
import "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const styleScript = Style_Script({
  weight: "400",
  variable: "--font-style-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "leetify",
  description: "Gamify LeetCode",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn(inter.className, "px-4 antialiased")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="container m-auto flex items-center justify-between py-4 text-center text-4xl">
              {/*TODO: Instead of hiding logo in small-screens, implement an hamburger menu for the navlinks.*/}
              <h1 className={cn("hidden sm:inline", styleScript.className)}>
                leetify
              </h1>
              <NavBar />
              <ThemeSwitcher />
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
