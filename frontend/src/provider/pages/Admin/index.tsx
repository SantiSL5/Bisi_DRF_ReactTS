// import { useEffect, useReducer, useState } from "react";
import "./styles.css";
// import ListBikes from "../../components/admin/crudBikes/list.component";
// import CreateBike from "../../components/admin/crudBikes/create.component";
// import ListStations from "../../components/admin/crudStations/list.component";
// import CreateStation from "../../components/admin/crudStations/create.component";
// import { useBikes } from "../../hooks/useBikes";
// import { useStations } from "../../hooks/useStations";
// import Spinner from "../../components/spinner/spinner.component";
import MenuAdmin from "../../components/admin/menuAdmin/menuAdmin.component";


const Admin = () => {
    // const { stations, createStations, deleteStations, deleteManyStations, updateStation } = useStations();

    return (
        <div className="adminView">
            <MenuAdmin/>
        </div>
    );
}

export default Admin;