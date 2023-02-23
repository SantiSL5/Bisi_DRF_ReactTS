import "./style.css"

const MenuProfile = ({ changeView }: any) => {
    return (
        <>
            <nav className="menuAdmin container navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapseAdmin">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse container-fluid" id="navbarCollapseAdmin">
                        <div className="container-fluid navbar-nav justify-content-evenly">
                            <a className="nav-item nav-link" onClick={() => changeView("rent")}>Rents</a>
                            <a className="nav-item nav-link" onClick={() => changeView("incidence")}>Incidences</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MenuProfile;