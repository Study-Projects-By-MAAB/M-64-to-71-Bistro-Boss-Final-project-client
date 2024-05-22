import React from "react"
import { FaGoogle } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"

const SocialLogin = () => {
    const { googleSignIn } = useAuth()

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((r) => {
                r.user
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
