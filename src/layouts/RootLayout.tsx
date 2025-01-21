
import { Outlet} from "react-router-dom"

import Navigation from "@/components/navigation";




const RootLayout = () => {
  return (
    <div className="h-screen flex dark:bg-[#1f1f1f]">
        <Navigation/>
        <main className="flex-1 h-full overflow-y-auto">
            <Outlet/>
        </main>
    </div>
  );
};

export default RootLayout;
