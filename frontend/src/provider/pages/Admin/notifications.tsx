import { useState } from "react";
import ListNotifications from "../../components/admin/crudNotifications/list.component";
import CreateNotification from "../../components/admin/crudNotifications/create.component";
import MenuAdmin from "../../components/admin/menuAdmin/menuAdmin.component";
import Spinner from "../../components/spinner/spinner.component";
import { useNotifications } from "../../hooks/useNotifications";


const AdminNotifications = () => {
    const { notifications, createNotification, deleteNotification, deleteManyNotifications, updateNotification } = useNotifications();
    const [op, setOp]: any = useState("create");
    const [updateData, setupdateData]: any = useState();

    const changeForm = (data: any, op: string) => {
        if (op == "create") {
            setOp(op);
            setupdateData(null)
        } else {
            setOp(op);
            setupdateData(data)
        }
    }

    return (
        <div className="adminView">
            <MenuAdmin />
            <CreateNotification createNotification={createNotification} operation={op} updateData={updateData} updateNotification={updateNotification} changeForm={changeForm} />
            {notifications ? <ListNotifications list={notifications} deleteNotification={deleteNotification} deleteManyNotifications={deleteManyNotifications} changeForm={changeForm} updateNotification={updateNotification}></ListNotifications> : <Spinner />}
        </div>
    );
}

export default AdminNotifications;