import { useEffect, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, rentQueries } from "../../core/queries";
import { toast } from 'react-toastify'

export function useRents() {

    const [rents, setRents]: any = useState(undefined);
    const [lastRent, setLastRent]: any = useState(undefined);

    useEffect(() => {
        // consume(queryConsumer.apiRent, rentQueries.getAllRents).then((res: any) => {
        //     setRents(res.data);
        // })
    }, [])

    const rentBike = ((data: any) => {
        consume(queryConsumer.apiRent, rentQueries.rentBike, data).then((res: any) => {
            if (res.data.data) {
                toast.error(res.data.data, { theme: "dark" })
            }
            // const aux = [...rents, res.data]
            // toast.success("Created successfully", { theme: "dark" })
            // setRents(aux)
        }).catch((e: any) => {
            console.log(e);
        })
    })

    const getRentInfo = (() => {
        consume(queryConsumer.apiRent, rentQueries.rentInfo).then((res: any) => {
            setLastRent(res.data)

            // if (res.data.data) {
            //     toast.error(res.data.data, { theme: "dark" })
            // }
            // const aux = [...rents, res.data]
            // toast.success("Created successfully", { theme: "dark" })
            // setRents(aux)
        }).catch((e: any) => {
            console.log(e);
        })
    })


    const createRent = ((data: any) => {
        consume(queryConsumer.apiRent, rentQueries.createRent, data).then((res: any) => {
            const aux = [...rents, res.data]
            toast.success("Created successfully", { theme: "dark" })
            setRents(aux)
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteRent = ((data: any) => {
        consume(queryConsumer.apiRent, rentQueries.deleteRent, data).then((res: any) => {
            toast.success("Deleted successfully", { theme: "dark" })
            setRents(rents.filter((item: any) => data !== item.id));
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteManyRents = ((data: any) => {
        let res: any = { ids: [] };
        data.map((e: any) => {
            return res.ids.push(e.id);
        })
        consume(queryConsumer.apiRent, rentQueries.deleteManyRents, res).then(() => {
            const array = rents.filter((x: any) => {
                return res.ids.indexOf(x.id) < 0;
            });
            setRents(array);
            toast.success("Deleted successfully", { theme: "dark" })
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const updateRent = ((data: any) => {
        consume(queryConsumer.apiRent, rentQueries.updateRent, data).then((res: any) => {
            let aux = [...rents];
            let index = aux.findIndex((x: any) => x.id === data.id);
            aux[index] = res.data;
            setRents(aux)
            toast.success("Updated successfully", { theme: "dark" })
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    return { rents, lastRent, createRent, deleteRent, deleteManyRents, updateRent, rentBike, getRentInfo };

}
