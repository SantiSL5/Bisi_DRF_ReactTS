import Home from "../pages/Home/";
// import About from "../pages/About/";
import Gancho from "../pages/Gancho/";
import Admin from "../pages/Admin/";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "../layout";
// import Test from "../pages/About/test.page";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Router = () => {
    return (
        <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        {/* <Route path="/about/" element={<About />}>
                        <Route path=":id" element={<Test />}></Route>
                    </Route> */}
                        <Route path="/gancho/" element={<Gancho />}></Route>
                        <Route path="/admin/" element={<Admin />}></Route>
                    </Routes>
                </Layout>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default Router;