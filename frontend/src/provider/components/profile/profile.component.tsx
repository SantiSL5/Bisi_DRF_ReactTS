import "./style.css"

const ProfileComponent = ({ user, addFunds }: any) => {
    return (
        <div className="profile-container">
            <div className="profile-info">
                <div className="col">
                    <img src={user.img} alt="" className="img-fluid"/>
                </div>
                <div className="profile-user-info col-10">
                    <p className="text-white">Username: {user.username}</p>
                    <p className="text-white">Email: {user.email}</p>
                    <div className="d-flex">
                        <div className="text-white d-flex justify-content-center align-items-center me-2">
                            <span className="me-2">Saldo disponible:</span>  
                            {user.balance <= 0
                                ? <span className="text-danger fw-bold">{user.balance} €</span>
                                : <span className="text-success fw-bold">{user.balance} €</span>
                            }
                            <span></span>
                        </div>
                        <button type="button" className="btn btn-success me-2" onClick={() => addFunds({ funds: 5 })}>+5 €</button>
                        <button type="button" className="btn btn-success me-2" onClick={() => addFunds({ funds: 10 })}>+10 €</button>
                        <button type="button" className="btn btn-success me-2" onClick={() => addFunds({ funds: 25 })}>+25 €</button>
                        <button type="button" className="btn btn-success" onClick={() => addFunds({ funds: 50 })}>+50 €</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileComponent;