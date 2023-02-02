import { useEffect, useReducer, useState } from "react";
import List from "../../components/admin/crudBikes/list.component";
import Create from "../../components/admin/crudBikes/create.component";
import { useBikes } from "../../hooks/useBikes";


const Admin = () => {
    const { bikes, createBike } = useBikes();

    return (
        <div>
            <Create createBike={createBike}></Create>
            {bikes ? <List list={bikes}></List> : <div>Loading...</div>}
        </div>
    );
}

export default Admin;