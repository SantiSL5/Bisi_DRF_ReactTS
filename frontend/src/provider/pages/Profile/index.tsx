import { useUsers } from "../../hooks/useUsers";




const Profile = () => {
    const { user } = useUsers();

    return (
        <div className="adminView container">
            <img src={user.img} alt="" />
            <div>
                <p className="text-white">{user.username}</p>
                <p className="text-white">{user.email}</p>
                <p className="text-white">{user.balance <= 0
                    ? <span className="text-danger fw-bold">{user.balance} €</span>
                    : <span className="text-success fw-bold">{user.balance} €</span>
                }</p>
            </div>
        </div>
    );
}

export default Profile;