import { useState } from "react";
import { useStations } from "../../hooks/useStations";
import ListStations from "../../components/rent/listStations.component";
import RentModal from "../../components/rent/modal.component";
import Spinner from "../../components/spinner/spinner.component";
import { useUsers } from "../../hooks/useUsers";
import { useRents } from "../../hooks/useRents";
import { useIncidences } from "../../hooks/useIncidences";

const Home = () => {
    const { stationsWithSlots, getStationsWithSlots } = useStations();
    const { lastRent, rentBike, returnBike, getRentInfo } = useRents();
    const { user } = useUsers();
    const { incidence, getIncidenceById, createIncidenceUser } = useIncidences();

    if (!stationsWithSlots) getStationsWithSlots();
    const [selectedSlot, setSelectedSlot]: any = useState();

    const getModalInfo = (slot: any) => {
        getIncidenceById(slot.id)
        if (user) {
            getRentInfo()
        }
        setSelectedSlot(slot);
    }

    return (
        <div className="container-fluid row">
            <div className="">
                {stationsWithSlots ? <ListStations stations={stationsWithSlots} getModalInfo={getModalInfo} /> : <Spinner />}
            </div>
            <RentModal user={user} rentInfo={lastRent} selectedSlot={selectedSlot} rentBike={rentBike} returnBike={returnBike} incidence={incidence} createIncidence={createIncidenceUser} />
        </div >
    );
}

export default Home;