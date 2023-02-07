import { useState } from "react";
import "./styles.css";
import ListSlots from "../../components/admin/crudSlots/list.component";
import CreateSlot from "../../components/admin/crudSlots/create.component"; 
import Spinner from "../../components/spinner/spinner.component";
import MenuAdmin from "../../components/admin/menuAdmin/menuAdmin.component";
import { useSlots } from "../../hooks/useSlots";

const AdminSlots = () => {
    const { slots, createSlot, deleteSlot, deleteManySlots, updateSlot } = useSlots();
    const [op, setOp]: any = useState("create");
    const [updateData, setupdateData]: any = useState();

    const changeForm = (data: any, op: string) => {
        setOp(op);
        setupdateData(data)
    }

    return (
        <div className="adminView">
            <MenuAdmin />
            <CreateSlot createSlot={createSlot} operation={op} updateData={updateData} updateSlot={updateSlot} />
            {slots ? <ListSlots list={slots} deleteSlot={deleteSlot} deleteManySlots={deleteManySlots} changeForm={changeForm} updateSlot={updateSlot}></ListSlots> : <Spinner />}
        </div>
    );
}

export default AdminSlots;