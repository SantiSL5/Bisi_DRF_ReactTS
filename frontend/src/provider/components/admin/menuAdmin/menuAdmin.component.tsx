import { Link } from "react-router-dom"
import "./style.css"

const MenuAdmin = () => {
    return (
        <>
            <nav className="menuAdmin container navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapseAdmin">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse container-fluid" id="navbarCollapseAdmin">
                        <div className="container-fluid navbar-nav justify-content-evenly">
                            <Link className="nav-item nav-link" to="/admin/stations">Stations</Link>
                            <Link className="nav-item nav-link" to="/admin/slots">Slots</Link>
                            <Link className="nav-item nav-link" to="/admin/bikes">Bikes</Link>
                            <Link className="nav-item nav-link" to="/admin/users">Users</Link>
                            <Link className="nav-item nav-link" to="/admin/incidences">Incidences</Link>
                            <Link className="nav-item nav-link" to="/admin/notifications">Notifications</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MenuAdmin;