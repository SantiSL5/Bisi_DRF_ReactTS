import Home from "../pages/Home/";
import Admin from "../pages/Admin/";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../layout";
import AdminBikes from "../pages/Admin/bikes";
import AdminStations from "../pages/Admin/stations";
import AdminSlots from "../pages/Admin/slots";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AdminGuard from "./guards/AdminGuard";
import { NoAuthGuard, AuthGuard } from "./guards/AuthGuard";
import AdminUsers from "../pages/Admin/users";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route element={<NoAuthGuard />}>
                        <Route path="/login/" element={<Login />}></Route>
                    </Route>
                    <Route element={<AdminGuard />}>
                        <Route path="/admin/" >
                            <Route index element={<Admin />} />
                            <Route path="stations/" element={<AdminStations />} />
                            <Route path="slots/" element={<AdminSlots />} />
                            <Route path="bikes/" element={<AdminBikes />} />
                            <Route path="users/" element={<AdminUsers />} />
                        </Route>
                    </Route>
                    <Route element={<AuthGuard />}>
                        <Route path="/profile/" element={<Profile />}></Route>
                    </Route>
                </Routes>
            </Layout>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default Router;