import { useEffect, useReducer, useState } from "react";
import List from "../../components/admin/crudBikes/list.component";
import Create from "../../components/admin/crudBikes/create.component";
import { useBikes } from "../../hooks/useBikes";

const bikesBilly = (state: any, action: any) => {


    switch (action.type) {
        case "set":
            return state.includes(action.list)
                ? state
                : [...state, action.list]
        default:
            return state;
    }
};

const Admin = () => {
    const { bikes, setBikes } = useBikes();

    const [trigger, pullTrigger]: any = useState(0);

    const [bikeList, dispatch] = useReducer(bikesBilly, []);

    useEffect(() => {
        if (bikes) {
            dispatch({ type: "set", list: bikes })
        }
    }, [bikes])

    return (
        <div>
            <Create></Create>
            {bikeList.length != 0 ? <List list={bikeList}></List> : <div>Loading...</div>}

        </div>
    );
}

export default Admin;