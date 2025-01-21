import { useContext } from "react";
import AuthContext  from "@/components/auth/authProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth;
