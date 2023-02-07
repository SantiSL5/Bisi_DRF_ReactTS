import { useContext, useEffect, useCallback, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, slotQueries } from "../../core/queries";
import { toast } from 'react-toastify'

export function useSlots() {

    const [slots, setSlots]: any = useState(undefined);

    useEffect(() => {
        consume(queryConsumer.apiSlot, slotQueries.getAllSlots).then((res: any) => {
            setSlots(res.data);
        })
    }, [])

    const createSlot = ((data: any) => {
        consume(queryConsumer.apiSlot, slotQueries.createSlot, data).then((res: any) => {
            const aux = [...slots, res.data]
            toast.success("Created successfully", { theme: "dark" })
            console.log(aux);
            
            setSlots(aux)
        }).catch(e => {
            if (e.response.data.non_field_errors) {
                toast.error("There cannot be 2 slots with the same number in a station", { theme: "dark" })
            } else {
                toast.error("Station with ID " + data.station + " does not exist", { theme: "dark" })
            }
        })
    })

    const deleteSlot = ((data: any) => {
        consume(queryConsumer.apiSlot, slotQueries.deleteSlot, data).then((res: any) => {
            toast.success("Deleted successfully", { theme: "dark" })
            setSlots(slots.filter((item: any) => data !== item.id));
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteManySlots = ((data: any) => {
        let res: any = { ids: [] };
        data.map((e: any) => {
            res.ids.push(e.id);
        })
        consume(queryConsumer.apiSlot, slotQueries.deleteManySlots, res).then(() => {
            const array = slots.filter((x: any) => {
                return res.ids.indexOf(x.id) < 0;
            });
            setSlots(array);
            toast.success("Deleted successfully", { theme: "dark" })
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const updateSlot = ((data: any) => {
        consume(queryConsumer.apiSlot, slotQueries.updateSlot, data).then((res: any) => {
            let aux = [...slots];
            let index = aux.findIndex((x: any) => x.id === data.id);
            aux[index] = res.data;
            setSlots(aux)
            toast.success("Updated successfully", { theme: "dark" })
        }).catch(e => {
            if (e.response.data.non_field_errors) {
                toast.error("There cannot be 2 slots with the same number in a station", { theme: "dark" })
            } else {
                toast.error("Station with ID " + data.station + " does not exist", { theme: "dark" })
            }
        })
    })

    return { slots, createSlot, deleteSlot, deleteManySlots, updateSlot };

}
