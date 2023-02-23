import ListIncidences from "../../components/profile/listIncidences.component";
import ProfileComponent from "../../components/profile/profile.component";
import Spinner from "../../components/spinner/spinner.component";
import { useIncidences } from "../../hooks/useIncidences";
import { useUsers } from "../../hooks/useUsers";




const Profile = () => {
    const { user, addFunds } = useUsers();
    const { incidencesUser, getIncidencesByUser } = useIncidences();
    if (!incidencesUser) getIncidencesByUser()
    return (
        <div className="container-fluid">
            <div className="container">
                {user ? <ProfileComponent user={user} addFunds={addFunds} /> : <Spinner />}
            </div>
            { incidencesUser ? <ListIncidences list={incidencesUser} /> : <Spinner />}
        </div>
    );
}

export default Profile;