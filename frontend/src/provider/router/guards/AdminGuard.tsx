import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { toast } from 'react-toastify';
import { queryConsumer, userQueries } from '../../../core/queries';
import { useUsers } from "../../hooks/useUsers";
import consume from '../consumer';
import { useNavigate, useLocation } from 'react-router-dom'

function AdminGuard() {
    const { isAdmin, setIsAdmin, user } = useUsers();
    const navigate = useNavigate();

    if (!isAdmin) {
        consume(queryConsumer.apiUser, userQueries.getUser).then((res: any) => {
            if (res.data.user.type === "admin") {
                setIsAdmin(true)
                return <Outlet />
            } else {
                throw new Error("");
            }
        }).catch((e: any) => {
            toast.error("Nice try", { theme: "dark" })
            return < Navigate to="/" />
        })
    }

    return isAdmin === true ? <Outlet /> : <></>
}

export default AdminGuard;