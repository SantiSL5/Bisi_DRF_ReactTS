import { useEffect, useState } from 'react'
import consume from '../router/consumer';
import { queryConsumer, notificationQueries } from "../../core/queries";
import { toast } from 'react-toastify'

export function useNotifications() {

    const [notifications, setNotifications]: any = useState(undefined);
    const [userNotifications, setUserNotifications]: any = useState(undefined);

    useEffect(() => {
        consume(queryConsumer.apiNotification, notificationQueries.getAllNotifications).then((res: any) => {
            setNotifications(res.data);
        })
    }, [])

    const getUserNotifications = (() => {
        consume(queryConsumer.apiNotification, notificationQueries.getUserNotification).then((res: any) => {
            setUserNotifications(res.data)
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const getAdminNotifications = (() => {
        consume(queryConsumer.apiNotification, notificationQueries.getAdminNotification).then((res: any) => {
            setUserNotifications(res.data)
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const createNotification = ((data: any) => {
        consume(queryConsumer.apiNotification, notificationQueries.createNotification, data).then((res: any) => {
            const aux = [...notifications, res.data]
            toast.success("Created successfully", { theme: "dark" })
            setNotifications(aux)
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteNotification = ((data: any) => {
        consume(queryConsumer.apiNotification, notificationQueries.deleteNotification, data).then((res: any) => {
            toast.success("Deleted successfully", { theme: "dark" })
            setNotifications(notifications.filter((item: any) => data !== item.id));
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const markAsRead = ((data: any) => {
        consume(queryConsumer.apiNotification, notificationQueries.markAsReadUser, data).then((res: any) => {
            // toast.success("Marked as read", { theme: "dark" })
            setUserNotifications(userNotifications.filter((item: any) => data.notification !== item.id));
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const markAsReadAdmin = ((data: any) => {
        consume(queryConsumer.apiNotification, notificationQueries.markAsReadAdmin, data).then((res: any) => {
            // toast.success("Marked as read", { theme: "dark" })
            setUserNotifications(userNotifications.filter((item: any) => data.notification !== item.id));
        }).catch((e: any) => {
            console.log(e);
            // toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const deleteManyNotifications = ((data: any) => {
        let res: any = { ids: [] };
        data.map((e: any) => {
            return res.ids.push(e.id);
        })
        consume(queryConsumer.apiNotification, notificationQueries.deleteManyNotifications, res).then(() => {
            const array = notifications.filter((x: any) => {
                return res.ids.indexOf(x.id) < 0;
            });
            setNotifications(array);
            toast.success("Deleted successfully", { theme: "dark" })
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    const updateNotification = ((data: any) => {
        consume(queryConsumer.apiNotification, notificationQueries.updateNotification, data).then((res: any) => {
            let aux = [...notifications];
            let index = aux.findIndex((x: any) => x.id === data.id);
            aux[index] = res.data;
            setNotifications(aux)
            toast.success("Updated successfully", { theme: "dark" })
        }).catch((e: any) => {
            toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    })

    return { notifications, userNotifications, getUserNotifications, getAdminNotifications, createNotification, deleteNotification, deleteManyNotifications, updateNotification, markAsRead, markAsReadAdmin };

}
