// import { useEffect, useReducer, useState } from "react";
import "./styles.css";
// import Spinner from "../../components/spinner/spinner.component";
import MenuAdmin from "../../components/admin/menuAdmin/menuAdmin.component";


const AdminSlots = () => {
    // const { bikes, createBike, deleteBike, deleteManyBikes, updateBike } = useBikes();
    // const [op, setOp]: any = useState("create");
    // const [updateData, setupdateData]: any = useState();


    // const changeForm = (data: any, op: string) => {
    //     setOp(op);
    //     setupdateData(data)
    // }

    return (
        <div className="adminView">
            <MenuAdmin />
            {/* <CreateBike createBike={createBike} operation={op} updateData={updateData} updateBike={updateBike} />
            {bikes ? <ListBikes list={bikes} deleteBike={deleteBike} deleteManyBikes={deleteManyBikes} changeForm={changeForm} updateBike={updateBike}></ListBikes> : <Spinner />} */}
        </div>
    );
}

export default AdminSlots;