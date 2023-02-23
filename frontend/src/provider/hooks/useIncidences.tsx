import { useEffect, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, incidenceQueries } from "../../core/queries";
import { toast } from 'react-toastify'

export function useIncidences() {

    const [incidences, setIncidences]: any = useState(undefined);
    const [incidence, setIncidence]: any = useState(undefined);

    useEffect(() => {
        consume(queryConsumer.apiIncidence, incidenceQueries.getAllIncidences).then((res: any) => {
            setIncidences(res.data);
        })
    }, [])

    const getIncidenceById = ((data: any) => {
        consume(queryConsumer.apiIncidence, incidenceQueries.getIncidenceById, data).then((res: any) => {
            setIncidence(res.data)
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const createIncidenceUser = ((data: any) => {
        consume(queryConsumer.apiIncidence, incidenceQueries.createIncidenceUser, data).then((res: any) => {
            const aux = [...incidence, res.data]
            toast.success("Created successfully", { theme: "dark" })
            setIncidence(aux)
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const createIncidence = ((data: any) => {
        consume(queryConsumer.apiIncidence, incidenceQueries.createIncidence, data).then((res: any) => {
            const aux = [...incidences, res.data]
            toast.success("Created successfully", { theme: "dark" })
            setIncidences(aux)
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteIncidence = ((data: any) => {
        consume(queryConsumer.apiIncidence, incidenceQueries.deleteIncidence, data).then((res: any) => {
            toast.success("Deleted successfully", { theme: "dark" })
            setIncidences(incidences.filter((item: any) => data !== item.id));
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteManyIncidences = ((data: any) => {
        let res: any = { ids: [] };
        data.map((e: any) => {
            return res.ids.push(e.id);
        })
        consume(queryConsumer.apiIncidence, incidenceQueries.deleteManyIncidences, res).then(() => {
            const array = incidences.filter((x: any) => {
                return res.ids.indexOf(x.id) < 0;
            });
            setIncidences(array);
            toast.success("Deleted successfully", { theme: "dark" })
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const updateIncidence = ((data: any) => {
        consume(queryConsumer.apiIncidence, incidenceQueries.updateIncidence, data).then((res: any) => {
            let aux = [...incidences];
            let index = aux.findIndex((x: any) => x.id === data.id);
            aux[index] = res.data;
            setIncidences(aux)
            toast.success("Updated successfully", { theme: "dark" })
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    return { incidences, incidence, getIncidenceById, createIncidence, createIncidenceUser, deleteIncidence, deleteManyIncidences, updateIncidence };

}
