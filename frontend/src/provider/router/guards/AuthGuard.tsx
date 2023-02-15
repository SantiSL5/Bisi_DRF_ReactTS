import { Navigate, Outlet } from "react-router-dom"
import Spinner from "../../components/spinner/spinner.component";
import { useUsers } from "../../hooks/useUsers";

export function NoAuthGuard() {
    const { user, loading } = useUsers();
    
    if (!loading) {
        return !user ? <Outlet /> : <Navigate to="/" />
    }
    return <Spinner />
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