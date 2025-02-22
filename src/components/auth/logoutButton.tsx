
import { useNavigate } from "react-router-dom";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children?: React.ReactNode;
}

const LogoutButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const {setAuth, Auth} = useAuth()
    const axios = useAxiosPrivate()
    const Comp = asChild ? Slot : "button";
    const navigate = useNavigate();
    const onClick = async() => {
      await axios.get("/auth/logout")
      setAuth({
        accessToken: '',
        email: '',
        name: '',
        role: '',
        profile: '',
        emailVerified: Auth?.emailVerified
      })
      navigate("/");
    };
    return (
      <Comp
        className={cn(
          "w-full text-muted-foreground cursor-pointer",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        {...props}
        children={children}
        onClick={onClick}
      />
    );
  },
);
LogoutButton.displayName = "LogoutButton";

export { LogoutButton, /* buttonVariants */ };

/* export const LogoutButton = ({children}:{children?:React.ReactNode}) => {
  const router = useRouter()
    const onClick = () => {
      signOut({redirect:false})
      router.push('/')
    }
  return (
    <span onClick={onClick} className='cursor-pointer'>
        {children}
    </span>
  )
} */
