import { Link } from "react-router-dom"
import "./style.css"

const MenuAdmin = () => {
    return (
        <>
            <nav className="menuAdmin container navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <div className="collapse navbar-collapse container-fluid" id="navbarCollapse">
                        <div className="container-fluid navbar-nav justify-content-evenly">
                            <Link className="nav-item nav-link" to="/admin/stations">Stations</Link>
                            <Link className="nav-item nav-link" to="/admin/slots">Slots</Link>
                            <Link className="nav-item nav-link" to="/admin/bikes">Bikes</Link>  
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MenuAdmin;