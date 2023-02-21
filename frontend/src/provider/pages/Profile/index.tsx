import ProfileComponent from "../../components/profile/profile.component";
import Spinner from "../../components/spinner/spinner.component";
import { useUsers } from "../../hooks/useUsers";




const Profile = () => {
    const { user, addFunds } = useUsers();

    return (
        <div className="adminView container">
            {user ? <ProfileComponent user={user} addFunds={addFunds} /> : <Spinner />}
        </div>
    );
}

export default Profile;