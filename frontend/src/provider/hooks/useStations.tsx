import { useEffect, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, stationQueries } from "../../core/queries";
import { toast } from 'react-toastify'

export function useStations() {

    const [stations, setStations]: any = useState(undefined);

    useEffect(() => {
        consume(queryConsumer.apiStation, stationQueries.getAllStations).then((res: any) => {
            setStations(res.data);
        })
    }, [])

    const createStation = ((data: any) => {
        if (data.slots !== "") {
            data.slots = parseInt(data.slots)
        }
        consume(queryConsumer.apiStation, stationQueries.createStation, data).then((res: any) => {
            const aux = [...stations, res.data]
            toast.success("Created successfully", { theme: "dark" })
            setStations(aux)
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteStation = ((data: any) => {
        consume(queryConsumer.apiStation, stationQueries.deleteStation, data).then((res: any) => {
            toast.success("Deleted successfully", { theme: "dark" })
            setStations(stations.filter((item: any) => data !== item.id));
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteManyStations = ((data: any) => {
        let res: any = { ids: [] };
        data.map((e: any) => {
            return res.ids.push(e.id);
        })
        consume(queryConsumer.apiStation, stationQueries.deleteManyStations, res).then(() => {
            const array = stations.filter((x: any) => {
                return res.ids.indexOf(x.id) < 0;
            });
            setStations(array);
            toast.success("Deleted successfully", { theme: "dark" })
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const updateStation = ((data: any) => {
        consume(queryConsumer.apiStation, stationQueries.updateStation, data).then((res: any) => {
            let aux = [...stations];
            let index = aux.findIndex((x: any) => x.id === data.id);
            aux[index] = res.data;
            setStations(aux)
            toast.success("Updated successfully", { theme: "dark" })
        }).catch(e => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    return { stations, createStation, deleteStation, deleteManyStations, updateStation };

}
