/* eslint-disable @typescript-eslint/no-unused-expressions */
import useRefreshToken from "@/hooks/useRefreshToken"
import { useEffect, useState } from "react"
import { Spinner } from "../spinner"
import { Outlet } from "react-router-dom"
import useAuth from "@/hooks/useAuth"


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const {Auth} = useAuth()

    useEffect(() =>{
        const verifyRefreshToken = async() =>{
            try {
                await refresh()
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        !Auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        console.log("isLoading: " +isLoading)
        console.log("aT: " + Auth?.accessToken)
    },[Auth?.accessToken, isLoading])

  return (
    <>
        {isLoading
        ? <Spinner size='lg'/> 
        : <Outlet/>
        }
    </>
  )
}

export default PersistLogin