import Home from "../pages/Home/";
// import About from "../pages/About/";
import Admin from "../pages/Admin/";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "../layout";
// import Test from "../pages/About/test.page";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminBikes from "../pages/Admin/bikes";
import AdminStations from "../pages/Admin/stations";
import AdminSlots from "../pages/Admin/slots";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/admin/">
                        <Route index element={<Admin />} />
                        <Route path="stations/" element={<AdminStations />} />
                        <Route path="slots/" element={<AdminSlots />} />
                        <Route path="bikes/" element={<AdminBikes />} />
                    </Route>

                </Routes>
            </Layout>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default Router;