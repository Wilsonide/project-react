
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
 type UserType= {
    id: string,
    name: string,
    email: string,
    emailVerified?: boolean,
    role: string,
    image?: string,
    isTwoFactorEnabled: boolean,
    refreshToken:string,
    provider?: string,
 }[] 
 

export const Users = () => {
    const axiosP = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const [users, setUsers] = useState<UserType>([])

    useEffect(()=>{
        const getUsers = async () => {
            try {
                const response = await axiosP.get('/users')
                console.log(response.data)
                setUsers(response.data);
            } catch (error) {
                console.log(error)
                navigate('/', {state: {from: location},replace: true})
            }
        }
        getUsers();
    },[axiosP, location, navigate])

  return (
    <article>
        <h2>Users List</h2>
        {users?.length
        ?   (
            <ul>
                {users.map((user) =>
                    <li key={user.id}>
                        {user.name}
                    </li>)
                }
            </ul>
        ) : 
            <p>No user found</p>
        }
    </article>
  )
}
