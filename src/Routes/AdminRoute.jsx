import React from "react"
import useAuth from "../hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom"
import { useAdmin } from "../hooks/useAdmin"

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const { isAdmin, isAdminLoading } = useAdmin()
    const location = useLocation()

    if (loading || isAdminLoading) {
        return <>Loading....</>
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
}

export default AdminRoute

// import React from "react"
// import { useAdmin } from "../hooks/useAdmin"
// import useAuth from "../hooks/useAuth"
// import { Navigate, useLocation } from "react-router-dom"

// const AdminRoute = (children) => {
//     const { isAdmin, isAdminLoading } = useAdmin()
//     const location = useLocation()
//     const { user, loading } = useAuth()

//     if (loading || isAdminLoading) return <>Loading........</>
//     if (user && isAdmin) return children

//     return <Navigate state={{ from: location }} to={"/login"} replace></Navigate>
// }

// export default AdminRoute
