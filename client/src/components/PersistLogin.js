import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useRefreshToken from "../hooks/useRefreshToken"

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {auth} = useAuth()
    const refresh = useRefreshToken()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(`isLoading : ${isLoading}`)
        console.log(`aT : ${JSON.stringify(auth?.accessToken)}`)
        // eslint-disable-next-line
    }, [isLoading])

  return (
    <>
        {isLoading
            ? <p>Loading ...</p>
            : <Outlet />
        }
    </>
  )
}

export default PersistLogin