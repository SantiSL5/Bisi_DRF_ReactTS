import { useState } from "react";
import { useStations } from "../../hooks/useStations";
import ListStations from "../../components/rent/listStations.component";
import RentModal from "../../components/rent/modal.component";
import Spinner from "../../components/spinner/spinner.component";

const Home = () => {
    const { stationsWithSlots, getStationsWithSlots } = useStations();

    if (!stationsWithSlots) getStationsWithSlots();
    const [rentInfo, setRentInfo]: any = useState();

    const getModalInfo = () => {
        setRentInfo(undefined);
    }

    return (
        <div className="container-fluid row">
            <div className="">
                {stationsWithSlots ? <ListStations stations={stationsWithSlots} getModalInfo={getModalInfo} /> : <Spinner />}
            </div>
            <RentModal rentInfo={rentInfo} />
        </div >
    );
}

export default Home;