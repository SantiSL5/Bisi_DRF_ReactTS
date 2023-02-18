import "./style.css"

const ListStations = ({ stations, getModalInfo }: any) => {

    return (
        <div className="container mt-3">
            <div className="text-white">
                {stations.map((station: any) => {
                    return (
                        <div className="row mb-3 station-container" key={station.id}>
                            <div className="col-3">
                                <div className="row fs-3 m-1">{station.name}</div>
                                <img src={`/assets/placeholder.jpg`} alt={station.name} className="img-fluid rounded" />
                                {/* <img src={`/articleImages/${imageName}`}  alt={station.name} className="img-fluid" /> */}
                            </div>
                            <div className="col ms-3">
                                <div className="row mt-5">
                                    {station.slots.map((slot: any) => {
                                        return (
                                            <div className="col-1 mb-3 mt-2" key={slot.id}>
                                                <button className="btn btn-dark d-flex flex-column justify-content-center align-items-center bike-button" data-bs-toggle="modal" data-bs-target="#rentModal" onClick={() => getModalInfo(slot)}>
                                                    {slot.warning || slot.disabled ? slot.disabled
                                                        ? <img src={`/assets/red_bike.png`} alt="unavailable" className="img-fluid" />
                                                        : <img src={`/assets/yellow_bike.png`} alt="might be unavailable" className="img-fluid" />
                                                        : slot.bike
                                                            ? <img src={`/assets/green_bike.png`} alt="available" className="img-fluid" />
                                                            : <img src={`/assets/gray_bike.png`} alt="available" className="img-fluid" />
                                                    }
                                                    <span className="">{slot.number}</span>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}

export default ListStations;