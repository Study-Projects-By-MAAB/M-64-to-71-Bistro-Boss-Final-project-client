import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth"
import React, { createContext, useEffect, useState } from "react"
import { app } from "../firebase/firebase.config"
import useAxiosPublic from "../hooks/useAxiosPublic"

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [load, setLoad] = useState(true)
    const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("current user", currentUser)
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email }
                axiosPublic.post("/jwt", userInfo).then((res) => {
                    // console.log(res.data.token)
                    if (res.data.token) {
                        localStorage.setItem("access-token", res.data.token)
                        setLoading(false)
                        setLoad(false)
                    }
                })
            } else {
                // remove token(if token stored in the client side like: local storage, caching, in memory)
                localStorage.removeItem("access-token")
                setLoading(false)
                setLoad(false)
            }
        })

        return () => {
            unSubscribe()
        }
    }, [axiosPublic])

    // useEffect(() => {
    //     if (user) {
    //         setLoading(false)
    //     }
    // }, [user])

    if (load) return <div className="flex items-center justify-center h-screen text-4xl">Loading...</div>

    const authInfo = { user, loading, createUser, signIn, logOut, updateUserProfile, googleSignIn }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider
