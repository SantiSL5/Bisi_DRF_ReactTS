import { useEffect, useReducer, useState } from "react";
import List from "../../components/list.component";
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




    // bikes.data[0].id
    return (
        <div>
            {bikeList.length != 0 ? <List list={bikeList}></List> : <div>ASS</div>}

            {/* <List list={bikeList}></List> */}
        </div>
    );
}

export default Admin;