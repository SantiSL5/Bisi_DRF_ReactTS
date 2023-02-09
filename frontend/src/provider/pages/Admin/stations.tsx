import { useState } from "react";
import { useStations } from "../../hooks/useStations";
import "./styles.css";
import Spinner from "../../components/spinner/spinner.component";
import MenuAdmin from "../../components/admin/menuAdmin/menuAdmin.component";
import CreateStation from "../../components/admin/crudStations/create.component"
import ListStations from "../../components/admin/crudStations/list.component"


const AdminStations = () => {
    const { stations, createStation, deleteStation, deleteManyStations, updateStation } = useStations();
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
            <CreateStation createStation={createStation} operation={op} updateData={updateData} updateStation={updateStation} changeForm={changeForm} />
            {stations ? <ListStations list={stations} deleteStation={deleteStation} deleteManyStations={deleteManyStations} changeForm={changeForm} updateStation={updateStation}></ListStations> : <Spinner />}
        </div>
    );
}

export default AdminStations;