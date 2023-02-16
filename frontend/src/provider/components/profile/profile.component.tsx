const ProfileComponent = ({ user }: any) => {
    return (
        <div>
            <img src={user.img} alt="" />
            <p className="text-white">{user.username}</p>
            <p className="text-white">{user.email}</p>
            <p className="text-white">{user.balance <= 0
                ? <span className="text-danger fw-bold">{user.balance} €</span>
                : <span className="text-success fw-bold">{user.balance} €</span>
            }</p>
        </div>
    );
}

export default ProfileComponent;