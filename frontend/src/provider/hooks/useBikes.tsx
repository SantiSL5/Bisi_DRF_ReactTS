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

    return { bikes, createBike, setLoad };

}
