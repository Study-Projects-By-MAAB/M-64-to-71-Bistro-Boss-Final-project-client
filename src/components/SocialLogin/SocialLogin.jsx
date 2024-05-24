import React from "react"
import { FaGoogle } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import useAxiosPublic from "../../hooks/useAxiosPublic"
import { useNavigate } from "react-router-dom"

const SocialLogin = () => {
    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((r) => {
                console.log(r.user)
                const userInfo = {
                    email: r.user?.email,
                    name: r.user?.displayName,
                }

                axiosPublic.post("/users", userInfo).then((res) => {
                    console.log(res.data)
                    navigate("/")
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-4"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    )
}

export default SocialLogin
