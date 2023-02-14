import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { toast } from 'react-toastify';
import { queryConsumer, userQueries } from '../../../core/queries';
import { useUsers } from "../../hooks/useUsers";
import consume from '../consumer';
import { useNavigate, useLocation } from 'react-router-dom'

if (sessionStorage.getItem("path")) {
    sessionStorage.removeItem("path")
}

export function NoAuthGuard() {
    const { user } = useUsers();
    return !user ? <Outlet /> : <Navigate to="/" />
}

// export function AuthGuard() {
//     const navigate = useNavigate();
//     const { isAuth } = useContext(UserContext);

//     if (!isAuth) {
//         UserService.GetUser()
//             .then(({ status }) => {
//                 if (status == 200) {
//                     setTimeout(() => {
//                         navigate(sessionStorage.getItem('/profile'));
//                     }, 800);
//                 }
//             })
//     }

//     return isAuth ? <Outlet /> : <Navigate to="/login" />
// }