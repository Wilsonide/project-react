
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
}

export const Heading = ({ title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold")}>{title}</h1>
    </div>
  );
};
