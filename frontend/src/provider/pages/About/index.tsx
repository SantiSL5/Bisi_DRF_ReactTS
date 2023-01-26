import { Outlet } from "react-router";
import "./style.css"
const About = () => {
    return (
        <div className="about">
            <div >
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default About;