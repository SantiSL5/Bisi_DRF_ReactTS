import { useContext, useEffect, useCallback, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, bikeQueries } from "../../core/queries";

export function useBikes() {

    const [bikes, setBikes]: any = useState(undefined);

    const getAllBikes = useEffect(() => {

        const req = async () => {
            const res = await consume(queryConsumer.apiBike, bikeQueries.getAllBikes);
            setBikes(res);
        }

        req();

        return () => {
            setBikes();
        };

    }, [])

    return { bikes, setBikes, getAllBikes };

}
