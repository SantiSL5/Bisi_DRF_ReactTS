import { useState } from "react";
import ListBikes from "../../components/admin/crudBikes/list.component";
import CreateBike from "../../components/admin/crudBikes/create.component"; 
import MenuAdmin from "../../components/admin/menuAdmin/menuAdmin.component";
import Spinner from "../../components/spinner/spinner.component";
import { useBikes } from "../../hooks/useBikes";


const AdminBikes = () => {
    const { bikes, createBike, deleteBike, deleteManyBikes, updateBike } = useBikes();
    const [op, setOp]: any = useState("create");
    const [updateData, setupdateData]: any = useState();

    const changeForm = (data: any, op: string) => {
        setOp(op);
        setupdateData(data)
    }

    return (
        <div className="adminView">
            <MenuAdmin />
            <CreateBike createBike={createBike} operation={op} updateData={updateData} updateBike={updateBike} />
            {bikes ? <ListBikes list={bikes} deleteBike={deleteBike} deleteManyBikes={deleteManyBikes} changeForm={changeForm} updateBike={updateBike}></ListBikes> : <Spinner />}
        </div>
    );
}

export default AdminBikes;