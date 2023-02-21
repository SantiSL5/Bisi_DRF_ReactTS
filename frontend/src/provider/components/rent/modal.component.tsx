import { Link, useNavigate, } from "react-router-dom";

const RentModal = ({ user, rentInfo, selectedSlot, rentBike, returnBike }: any) => {
    const navigate = useNavigate();

    return (
        <div className="container mt-3">
            <div className="modal fade" id="rentModal" aria-labelledby="rentModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="rentModalLabel">Rent info</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                rentInfo ?
                                    selectedSlot.disabled
                                        ? <>Slot disabled because: </>
                                        : <></>
                                    :
                                    <>Loading...</>
                            }
                        </div>
                        <div className="modal-footer">
                            {
                                selectedSlot
                                    ? selectedSlot.disabled
                                        ? <button type="button" className="btn btn-danger" disabled>Disabled slot</button>
                                        : user
                                            ? rentInfo
                                                ? rentInfo.returned_at
                                                    ? user.balance <= 0
                                                        ? <span className="text-danger">Insufficient funds <button className="btn btn-info" data-bs-dismiss="modal" onClick={() => navigate("/profile")}>Add funds</button></span>
                                                        : <button className="btn btn-success" data-bs-dismiss="modal" onClick={() => rentBike({ "starting_slot": selectedSlot.id })}>Rent bike</button>
                                                    : rentInfo.active
                                                        ? selectedSlot.bike
                                                            ? <button className="btn btn-success" disabled>Slot occupied</button>
                                                            : <button className="btn btn-success" data-bs-dismiss="modal" onClick={() => returnBike({ "ending_slot": selectedSlot.id })}>Return bike</button>
                                                        : selectedSlot.bike
                                                            ? <button className="btn btn-success" data-bs-dismiss="modal" onClick={() => rentBike({ "starting_slot": selectedSlot.id })}>Rent bike</button>
                                                            : <button className="btn btn-success" disabled>Empty slot</button>
                                                : selectedSlot.bike
                                                    ? user.balance <= 0
                                                        ? <span className="text-danger">Insufficient funds <button className="btn btn-info" data-bs-dismiss="modal" onClick={() => navigate("/profile")}>Add funds</button></span>
                                                        : <button className="btn btn-success" data-bs-dismiss="modal" onClick={() => rentBike({ "starting_slot": selectedSlot.id })}>Rent bike</button>
                                                    : <button className="btn btn-success" disabled>Empty slot</button>

                                            : <button className="btn btn-info" data-bs-dismiss="modal" onClick={() => navigate("/login")}>Login to be able to rent a bike</button> // Con un elemento de tipo link no funciona porque el modal se queda abierto
                                    : <></>
                            }
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default RentModal;