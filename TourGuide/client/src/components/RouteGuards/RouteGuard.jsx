import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext"

export const RouteGuard = () => {

    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to={'/user/login'} />
    }

    return <Outlet />
}


// another variant for guards

// export const RouteGuard = (
//     children,
// ) => {

//     const { isAuthenticated } = useAuthContext();

//     if (!isAuthenticated) {
//         return <Navigate to={'/user/login'} />
//     }

//     return (
//         <>
//             {children}
//         </>
//     )
// }