import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';

interface IFormInputs {
    message: string,
}

const RentModal = ({ user, rentInfo, selectedSlot, rentBike, returnBike, incidence, createIncidence }: any) => {
    const navigate = useNavigate();
    const [view, setView]: any = useState("info");

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<IFormInputs>({
        criteriaMode: "all"
    });

    const onSubmit = (data: IFormInputs) => {
        createIncidence({ message: data.message, slot: selectedSlot.id });
        setView("info")
    };

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
                                view === "info"
                                    ? selectedSlot
                                        ? incidence
                                            ? incidence.length > 0
                                                ? selectedSlot.disabled || selectedSlot.warning
                                                    ? <>{selectedSlot.disabled ? <>Slot disabled because:</> : <>Slot with unresolved incidences, check them out before riding:</>}
                                                        <ul>
                                                            {incidence.map((incidence: any, i: number) => {
                                                                return (
                                                                    <li key={incidence.id}>{incidence.message}</li>
                                                                )
                                                            })}
                                                        </ul></>
                                                    : <></>
                                                : selectedSlot.bike
                                                    ? <>Bike without incidences and ready to be rented.</>
                                                    : <>Empty slot without incidences</>
                                            : <></>
                                        : <></>
                                    : <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-2">
                                            <label htmlFor="message" className="form-label">Message:
                                                <textarea id="message" className="form-control mt-2"
                                                    {...register("message", {
                                                        required: "This input is required.",
                                                        minLength: {
                                                            value: 10,
                                                            message: "At least 10 characters."
                                                        }
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="message"
                                                    render={({ messages }) => {
                                                        return messages
                                                            ? Object.entries(messages).map(([type, message]) => (
                                                                <p key={type}>{message}</p>
                                                            ))
                                                            : null;
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <button type="submit" className="btn btn-info">Create incidence</button>
                                        </div>
                                    </form>

                            }
                        </div>
                        <div className="modal-footer">
                            {
                                user
                                    ? view === "info"
                                        ? <button className="btn btn-warning" onClick={() => setView("form")}>Create Incidence</button>
                                        : <button className="btn btn-info" onClick={() => setView("info")}>View Info</button>
                                    : <></>
                            }
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