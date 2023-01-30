import { Link } from "react-router-dom";

interface HeaderProps {
    title: string,
}

const Header = (props: HeaderProps) => {
    const id = "Pepe"
    return <div>
        <Link to="/">Home</Link>
        {/* <Link to="/about">About</Link> */}
        <Link to={`/about/${id}`}>About</Link>
        <Link to="/gancho">Gancho</Link>
        <Link to="/admin">Admin</Link>

        {props.title}
    </div>
}

export default Header;