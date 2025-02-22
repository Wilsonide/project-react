
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Heading = () => {
  const { Auth:user} = useAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">
        Your Ideas, Documents, & Plans, Unified, Welcome to{" "}
        <span className="underline">Edukate</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium text-white">
        Motion is the connected workspace where <br />
        better, faster work happens.
      </h3>


      {user?.email && (
        <Button>
          <Link to="/dashboard" className="flex items-center">
            Enter Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}

      {!user?.email && (
        <LoginButton>Edukate Signup</LoginButton>
      )}
    </div>
  );
};
