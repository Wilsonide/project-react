"use client";
import { useScrollTop } from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/userButton";
import useAuth from "@/hooks/useAuth";
import { Logo } from "./logo";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const { Auth } = useAuth();
  return (
    <div
      className={cn(
        "z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-800 to-blue-800 fixed top-0 flex items-center w-full p-6 dark:bg-[#1f1f1f]",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!Auth?.email &&(
          <>
            <LoginButton>Edukate signin</LoginButton>
            <LoginButton mode="modal">Login</LoginButton>
          </>
        )}

        {Auth?.email && (
          <>
            <Button
              asChild
              size="sm"
              variant="link"
              className={cn("font-semibold",)}
            >
              <Link to="/dashboard">Enter Account </Link>
            </Button>
            <UserButton />
          </>
        )}
      </div>
    </div>
  );
};
