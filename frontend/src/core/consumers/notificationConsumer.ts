import Api from "../api/api";
import secret from "../../secret";

const notificationConsumer: any = {

    getAll: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/notification/",
        })
    },
    getByUser: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/notification/user/",
        })
    },
    getByAdmin: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/notification/admin/",
        })
    },
    markAsReadUser: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/notification/user/",
            data: data
        })
    },
    markAsReadAdmin: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/notification/admin/",
            data: data
        })
    },
    createOne: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/notification/",
            data: data
        })
    },
    deleteOne: (data: any) => {
        return Api({
            method: "delete",
            url: secret.DJANGO_APP_URL + "/notification/" + data,
        })
    },
    deleteMany: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/notification/deleteMany/",
            data: data
        })
    },
    updateOne: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/notification/" + data.id,
            data: data.data
        })
    },
}

export default notificationConsumer;