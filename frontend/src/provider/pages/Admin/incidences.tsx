import { useState } from "react";
import ListIncidences from "../../components/admin/crudIncidences/list.component";
import CreateIncidence from "../../components/admin/crudIncidences/create.component"; 
import MenuAdmin from "../../components/admin/menuAdmin/menuAdmin.component";
import Spinner from "../../components/spinner/spinner.component";
import { useIncidences } from "../../hooks/useIncidences";


const AdminIncidences = () => {
    const { incidences, createIncidence, deleteIncidence, deleteManyIncidences, updateIncidence } = useIncidences();
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
            <CreateIncidence createIncidence={createIncidence} operation={op} updateData={updateData} updateIncidence={updateIncidence} changeForm={changeForm}/>
            {incidences ? <ListIncidences list={incidences  } deleteIncidence={deleteIncidence} deleteManyIncidences={deleteManyIncidences} changeForm={changeForm} updateIncidence={updateIncidence}></ListIncidences> : <Spinner />}
        </div>
    );
}

export default AdminIncidences;