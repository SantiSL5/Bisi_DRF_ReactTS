import ProfileComponent from "../../components/profile/profile.component";
import Spinner from "../../components/spinner/spinner.component";
import { useUsers } from "../../hooks/useUsers";




const Profile = () => {
    const { user } = useUsers();

    return (
        <div className="adminView container">
            {user ? <ProfileComponent user={user} /> : <Spinner />}
        </div>
    );
}

export default Profile;