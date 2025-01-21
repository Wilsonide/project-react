'use client'
import AuthContext from "@/components/auth/authProvider";
import { useContext } from "react";

const CurrentUser = () => {
    const {Auth} = useContext(AuthContext)
    return Auth
}

export default CurrentUser;