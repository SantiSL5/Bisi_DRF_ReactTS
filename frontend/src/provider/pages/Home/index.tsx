import { useEffect, useState } from "react";
import { useStations } from "../../hooks/useStations";
import ListStations from "../../components/rent/listStations.component";
import Spinner from "../../components/spinner/spinner.component";
import { useSlots } from "../../hooks/useSlots";


const Home = () => {
    const { stationsWithSlots, getStationsWithSlots } = useStations();

    if (!stationsWithSlots) getStationsWithSlots();

    return (
        <div className="container-fluid row">
            <div className="">
                {stationsWithSlots ? <ListStations stations={stationsWithSlots} /> : <Spinner />}
            </div>
        </div >
    );
}

export default Home;