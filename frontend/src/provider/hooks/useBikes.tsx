import { useContext, useEffect, useCallback, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, bikeQueries } from "../../core/queries";

export function useBikes() {

    const [bikes, setBikes]: any = useState(undefined);
    const [load, setLoad]: any = useState(true)

    useEffect(() => {
        consume(queryConsumer.apiBike, bikeQueries.getAllBikes).then((res: any )=> {
            setBikes(res.data);

        })
    }, [])

    const createBike = ((data: any) => {

        consume(queryConsumer.apiBike, bikeQueries.createBike, data).then((res: any) => {
            const aux = [...bikes, res.data]
            
            setBikes(aux)
        })
    })

    return { bikes, createBike,setLoad };

}
