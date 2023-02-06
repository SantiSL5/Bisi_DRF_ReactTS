import { useEffect, useReducer, useState } from "react";
import ListBikes from "../../components/admin/crudBikes/list.component";
import CreateBike from "../../components/admin/crudBikes/create.component";
import { useBikes } from "../../hooks/useBikes";
import Spinner from "../../components/spinner/spinner.component";


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
            <CreateBike createBike={createBike} operation={op} updateData={updateData} updateBike={updateBike}></CreateBike>
            {bikes ? <ListBikes list={bikes} deleteBike={deleteBike} deleteManyBikes={deleteManyBikes} changeForm={changeForm} updateBike={updateBike}></ListBikes> : <Spinner/>}
        </div>
    );
}

export default Admin;