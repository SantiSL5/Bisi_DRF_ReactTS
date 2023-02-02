import { useContext, useEffect, useCallback, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, bikeQueries } from "../../core/queries";
import { toast } from 'react-toastify'

export function useBikes() {

    const [bikes, setBikes]: any = useState(undefined);
    const [load, setLoad]: any = useState(true)

    useEffect(() => {
        consume(queryConsumer.apiBike, bikeQueries.getAllBikes).then((res: any) => {
            setBikes(res.data);

        })
    }, [])

    const createBike = ((data: any) => {
        consume(queryConsumer.apiBike, bikeQueries.createBike, data).then((res: any) => {
            const aux = [...bikes, res.data]
            toast.success("Created successfully", { theme: "dark" })
            setBikes(aux)
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteBike = ((data: any) => {
        consume(queryConsumer.apiBike, bikeQueries.deleteBike, data).then((res: any) => {
            toast.success("Deleted successfully", { theme: "dark" })
            setBikes(bikes.filter((item: any) => data !== item.id));
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteManyBikes = ((data: any) => {

        let res: any = { ids: [] };
        data.map((e: any) => {
            res.ids.push(e.id);
        })

        consume(queryConsumer.apiBike, bikeQueries.deleteManyBikes, res).then(() => {
            const array = bikes.filter((x: any) => {
                return res.ids.indexOf(x.id) < 0;
            });
            setBikes(array);
            toast.success("Deleted successfully", { theme: "dark" })
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    return { bikes, createBike, setLoad, deleteBike, deleteManyBikes };

}
