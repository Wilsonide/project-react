import { Outlet } from "react-router-dom";


const AuthLayout = () => {
  return (
    <div className=" flex items-center justify-center h-screen">
        <div className="justify-center items-center">
          <Outlet/>
        </div>
    </div>
  );
};

export default AuthLayout;
