import { cn } from "@/lib/utils";


export const Logo = () => {
  return (
    <div className={cn("hidden md:flex items-center gap-x-2")}>
      {/* <img
        src="/logo.svg"
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden"
      /> */}
      <img
        src="/logo-dark.svg"
        height="40"
        width="40"
        alt="Logo"
        className=""
      />
      <p className={cn("font-semibold text-white")}>Edukate</p>
    </div>
  );
};
