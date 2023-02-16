
const ListStations = ({ stations }: any) => {


    return (
        <div className="container mt-3">

            <div className="text-white">
                {stations.map((station: any) => {
                    return (
                        <div className="row mb-3" key={station.id}>
                            <img src={`/assets/placeholder.jpg`} alt={station.name} className="img-fluid col-3" />
                            <div className="col-8">
                                <div className="row">{station.name}</div>
                                <div className="row">A</div>
                            </div>
                            {/* <img src={`/articleImages/${imageName}`}  alt={station.name} className="img-fluid" /> */}

                        </div>
                    )
                })}
            </div>

        </div >
    );
}

export default ListStations;


// {slot.warning || slot.disabled ? slot.disabled
//     ? <img src={`/assets/red_bike.png`} alt="unavailable" className="img-fluid" />
//     : <img src={`/assets/yellow_bike.png`} alt="might be unavailable" className="img-fluid" />
//     : <img src={`/assets/green_bike.png`} alt="available" className="img-fluid" />}
