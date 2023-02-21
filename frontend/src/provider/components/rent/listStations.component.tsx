import "./style.css"

const ListStations = ({ stations, getModalInfo }: any) => {

    return (
        <div className="container-lg mt-3">
            <div className="text-white">
                {stations.map((station: any) => {
                    return (
                        <div className="row mb-3 station-container" key={station.id}>
                            <div className="row fs-3 m-1">{station.name}</div>
                            <div className="col-12 col-md-3">
                                <img src={`/assets/placeholder.jpg`} alt={station.name} className="img-fluid rounded" />
                                {/* <img src={`/articleImages/${imageName}`}  alt={station.name} className="img-fluid" /> */}
                            </div>
                            <div className="col col-md col-lg">
                                <div className="row mt-3 mt-md-0 bike-container">
                                    {station.slots.map((slot: any, i: number) => {
                                        return (
                                            <div className={"col-2 col-lg-1 mb-3 mt-2 bike" + i} key={slot.id}>
                                                <button className="btn btn-dark d-flex flex-column justify-content-center align-items-center bike-button" data-bs-toggle="modal" data-bs-target="#rentModal" onClick={() => getModalInfo(slot)}>
                                                    {slot.warning || slot.disabled ? slot.disabled
                                                        ? <img src={`/assets/red_bike.png`} alt="unavailable" className="img-fluid bike-image" />
                                                        : slot.bike
                                                            ? <img src={`/assets/yellow_bike.png`} alt="might be unavailable" className="img-fluid bike-image" />
                                                            : <img src={`/assets/gray_bike.png`} alt="available" className="img-fluid bike-image" />
                                                        : slot.bike
                                                            ? <img src={`/assets/green_bike.png`} alt="available" className="img-fluid bike-image" />
                                                            : <img src={`/assets/gray_bike.png`} alt="available" className="img-fluid bike-image" />
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