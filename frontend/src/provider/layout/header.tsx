import { Link } from "react-router-dom";
import "./style.css"
import { useUsers } from "../hooks/useUsers";
import { useRents } from "../hooks/useRents";
import { useNotifications } from "../hooks/useNotifications";

interface HeaderProps {
    title: string,
}

const Header = (props: HeaderProps) => {
    const { user, isAdmin, logout } = useUsers();
    const { lastRent, getRentInfo } = useRents();
    const { userNotifications, getUserNotifications, getAdminNotifications, markAsRead, markAsReadAdmin } = useNotifications();

    if (!userNotifications && user && !isAdmin) getUserNotifications()
    else if (!userNotifications && user && isAdmin) getAdminNotifications()
    if (!lastRent && user) getRentInfo();

    console.log(userNotifications);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{props.title}</Link>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/">Home</Link>
                            {isAdmin ? <Link className="nav-item nav-link" to="/admin">Admin</Link> : <></>}
                        </div>
                        <div className="navbar-nav ms-auto">
                            {user
                                ?
                                <div className="nav-item navbar-collapse">

                                    {lastRent
                                        ? <div><span className="text-white me-3">{lastRent.duration} mins</span><img src={`/assets/green_bike.png`} alt="unavailable" className="img-fluid me-4" width="30px" /></div>
                                        : <img src={`/assets/gray_bike.png`} alt="unavailable" className="img-fluid me-4" width="30px" />
                                    }

                                    <div className=" dropdown">
                                        <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.balance <= 0
                                                ? <span className="text-danger fw-bold">{user.balance.toFixed(2)} €</span>
                                                : <span className="text-success fw-bold">{user.balance.toFixed(2)} €</span>
                                            }
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-dark">
                                            <li><Link className="dropdown-item" to="/profile">Add funds</Link></li>
                                        </ul>
                                    </div>
                                    {userNotifications
                                        ? <div className="me-1 dropstart">
                                            <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                                {userNotifications.length == 0
                                                    ? <img src={`/assets/bell.png`} alt="unavailable" className="img-fluid" width="30px" />
                                                    : <><span className="position-absolute top-0 start-0 badge rounded-pill bg-danger">{userNotifications.length}
                                                        <span className="visually-hidden">unread notifications</span>
                                                    </span><img src={`/assets/active_bell.png`} alt="unavailable" className="img-fluid" width="30px" /></>
                                                }
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                {userNotifications.length == 0
                                                    ? <li className="dropdown-item">No unread notifications</li>
                                                    : <>{userNotifications.map((noti: any, i: number) => {
                                                        return (
                                                            <li key={noti.id} className="dropdown-item me-4">{noti.message}<img src={`/assets/cross.png`} alt="unavailable" className="img-fluid cross-img" width="30px" onClick={() => !isAdmin ? markAsRead({ notification: noti.id }) : markAsReadAdmin({ notification: noti.id })} /> </li>
                                                        )
                                                    })}
                                                    </>
                                                }
                                            </ul>
                                        </div>
                                        : <></>}
                                    <Link to="/profile"><img src={user.img} alt="pfp" className="img-fluid" width="44" /></Link>
                                    <Link className="nav-item nav-link btn btn-link" to="/profile">{user.username}</Link>
                                    <button className="nav-item nav-link btn btn-link" onClick={logout}>Logout</button>
                                </div>
                                : <Link className="nav-item nav-link" to="/login">Login</Link>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;