import { Axios } from "@/lib/axios";
import useAuth from "./useAuth"


const useRefreshToken = () => {
    const {setAuth,Auth} = useAuth();
    const refresh = async () => {
        const response = await Axios.get('/auth/refresh')
        setAuth(prev => {
            console.log("prevAuth =======",JSON.stringify(prev));
            return {...prev, ...response.data}  
        })
        console.log("myAuth =====",JSON.stringify(Auth));
        return response.data.accessToken
    }
  return refresh
}

export default useRefreshToken