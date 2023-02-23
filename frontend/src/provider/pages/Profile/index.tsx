import { useState } from "react";
import ListIncidences from "../../components/profile/listIncidences.component";
import ListRent from "../../components/profile/listRent.component";
import MenuProfile from "../../components/profile/menu.component";
import ProfileComponent from "../../components/profile/profile.component";
import Spinner from "../../components/spinner/spinner.component";
import { useIncidences } from "../../hooks/useIncidences";
import { useRents } from "../../hooks/useRents";
import { useUsers } from "../../hooks/useUsers";




const Profile = () => {
    const { user, addFunds } = useUsers();
    const { incidencesUser, getIncidencesByUser } = useIncidences();
    const { userRents, getUserRents } = useRents();
    const [view, setView]: any = useState("rent");
    if (!incidencesUser) getIncidencesByUser()
    if (!userRents) getUserRents()

    const changeView = (view: any) => {
        setView(view)
    }

    return (
        <div className="container">
            <div className="container mb-3">
                {user ? <ProfileComponent user={user} addFunds={addFunds} /> : <Spinner />}
            </div>
            <div className="mb-3">
                <MenuProfile changeView={changeView} />
            </div>
            {
                view == "rent"
                    ? userRents
                        ? <ListRent list={userRents} />
                        : <Spinner />
                    : incidencesUser
                        ? <ListIncidences list={incidencesUser} />
                        : <Spinner />}
        </div>
    );
}

export default Profile;