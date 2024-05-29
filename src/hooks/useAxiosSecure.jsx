import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"

const axiosSecure = axios.create({
    baseURL: "https://bistro-boss-server-opal-alpha.vercel.app",
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()
    // request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("access-token")
            // console.log("req stooped by interceptors", token)
            config.headers.authorization = `Bearer ${token}`
            return config
        },
        function (error) {
            console.log(error)
            return Promise.reject(error)
        },
    )
    // interceptors 401 and 403 status
    axiosSecure.interceptors.response.use(
        function (response) {
            return response
        },
        async (error) => {
            const status = error.response.status
            console.log("status error in the interceptors", status)
            // for 401 or 403 logout the user and move the user to the login page
            if (status === 401 || status === 403) {
                await logOut()
                navigate("/login")
            }
            return Promise.reject(error)
        },
    )
    return axiosSecure
}

export default useAxiosSecure
