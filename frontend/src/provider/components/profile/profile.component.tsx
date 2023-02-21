const ProfileComponent = ({ user, addFunds }: any) => {
    return (
        <div>
            <img src={user.img} alt="" />
            <p className="text-white">{user.username}</p>
            <p className="text-white">{user.email}</p>
            <p className="text-white">{user.balance <= 0
                ? <span className="text-danger fw-bold">{user.balance} €</span>
                : <span className="text-success fw-bold">{user.balance} €</span>
            }</p>
            <button type="button" className="btn btn-success me-2" onClick={() => addFunds({ funds: 5 })}>+5 €</button>
            <button type="button" className="btn btn-success" onClick={() => addFunds({ funds: 10 })}>+10 €</button>
        </div>
    );
}

export default ProfileComponent;