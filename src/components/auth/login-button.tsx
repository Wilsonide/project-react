"use client";

import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./LoginForm";
import { Button } from "../ui/button";

interface loginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: loginButtonProps) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          <div>
            <Button size="sm">{children}</Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button className="cursor-pointer" onClick={onClick} variant="ghost">
      {children}
    </Button>
  );
};
