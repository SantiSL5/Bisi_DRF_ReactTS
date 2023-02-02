import { useEffect, useReducer, useState } from "react";
import List from "../../components/admin/crudBikes/list.component";
import Create from "../../components/admin/crudBikes/create.component";
import { useBikes } from "../../hooks/useBikes";


const Admin = () => {
    const { bikes, createBike, deleteBike, deleteManyBikes } = useBikes();

    return (
        <div>
            <Create createBike={createBike}></Create>
            {bikes ? <List list={bikes} deleteBike={deleteBike} deleteManyBikes={deleteManyBikes}></List> : <div>Loading...</div>}
        </div>
    );
}

export default Admin;