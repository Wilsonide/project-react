import { Outlet } from "react-router-dom";


const AuthLayout = () => {
  return (
    <div className=" flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-800 to-sky-600">
        <div className="justify-center items-center">
          <Outlet/>
        </div>
    </div>
  );
};

export default AuthLayout;
