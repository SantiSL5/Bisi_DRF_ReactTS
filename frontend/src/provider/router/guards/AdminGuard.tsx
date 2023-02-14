import { Navigate, Outlet } from "react-router-dom"
import { toast } from 'react-toastify';
import { queryConsumer, userQueries } from '../../../core/queries';
import { useUsers } from "../../hooks/useUsers";
import consume from '../consumer';

function AdminGuard() {
    const { isAdmin, setIsAdmin } = useUsers();

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