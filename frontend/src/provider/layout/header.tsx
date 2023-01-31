import { Link } from "react-router-dom";
import "./style.css"

interface HeaderProps {
    title: string,
}

const Header = (props: HeaderProps) => {
    const id = "Pepe"
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand">{props.title}</a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/">Home</Link>
                            <Link className="nav-item nav-link" to="/gancho">Gancho</Link>
                            <Link className="nav-item nav-link" to="/admin">Admin</Link>  
                        </div>
                        <div className="navbar-nav ms-auto">
                            <Link className="nav-item nav-link" to="/login">Login</Link>  
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;