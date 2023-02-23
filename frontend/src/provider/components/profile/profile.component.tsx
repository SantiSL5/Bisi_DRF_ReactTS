import "./style.css"

const ProfileComponent = ({ user, addFunds }: any) => {
    return (
        <div className="profile-container">
            <div className="profile-info row">
                <div className="col-12 col-md">
                    <img src={user.img} alt="" className="img-fluid" />
                </div>
                <div className="profile-user-info col-10">
                    <p className="text-white">Username: {user.username}</p>
                    <p className="text-white">Email: {user.email}</p>
                    <div className="d-flex row">
                        <div className="text-white d-flex align-items-center me-2 mb-2">
                            <span className="me-2">Saldo disponible:</span>
                            {user.balance <= 0
                                ? <span className="text-danger fw-bold">{user.balance} €</span>
                                : <span className="text-success fw-bold">{user.balance} €</span>
                            }
                        </div>
                        <div className="col-12 col-md">
                            <button type="button" className="btn btn-success me-2 mb-2" onClick={() => addFunds({ funds: 5 })}>+5 €</button>
                            <button type="button" className="btn btn-success me-2 mb-2" onClick={() => addFunds({ funds: 10 })}>+10 €</button>
                            <button type="button" className="btn btn-success me-2 mb-2" onClick={() => addFunds({ funds: 25 })}>+25 €</button>
                            <button type="button" className="btn btn-success mb-2" onClick={() => addFunds({ funds: 50 })}>+50 €</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileComponent;