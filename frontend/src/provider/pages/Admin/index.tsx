import { useEffect, useReducer, useState } from "react";
import List from "../../components/admin/crudBikes/list.component";
import Create from "../../components/admin/crudBikes/create.component";
import { useBikes } from "../../hooks/useBikes";


const Admin = () => {
    const { bikes, createBike, deleteBike, deleteManyBikes, updateBike } = useBikes();

    const [op, setOp]: any = useState("create");
    const [updateData, setupdateData]: any = useState();

    const changeForm = (data: any, op: string) => {
        setOp(op);
        setupdateData(data)
    }

    return (
        <div>
            <Create createBike={createBike} operation={op} updateData={updateData} updateBike={updateBike}></Create>
            {bikes ? <List list={bikes} deleteBike={deleteBike} deleteManyBikes={deleteManyBikes} changeForm={changeForm} updateBike={updateBike}></List> : <div>Loading...</div>}
        </div>
    );
}

export default Admin;