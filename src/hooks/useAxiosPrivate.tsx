import { useEffect } from "react"
import useAuth from "./useAuth"
import useRefreshToken from "./useRefreshToken"
import { privateAxios } from "@/lib/axios"


const useAxiosPrivate = () => {
    const refresh = useRefreshToken()
    const {Auth} = useAuth()
    useEffect(()=>{
        const  requestIntercept = privateAxios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${Auth?.accessToken}`
                }
                return config
            },
            (error) => {
                Promise.reject(error)
            }
        )

        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) =>{
                const newAccessToken = await refresh()
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return privateAxios(prevRequest)
                }
                return Promise.reject(error)
            }
        )


        return () =>{
            privateAxios.interceptors.request.eject(requestIntercept);
            privateAxios.interceptors.response.eject(responseIntercept);
        }
    },[Auth, refresh])
    
  return privateAxios
}

export default useAxiosPrivate