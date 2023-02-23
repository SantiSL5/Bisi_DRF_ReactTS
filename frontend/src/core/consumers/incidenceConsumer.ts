import Api from "../api/api";
import secret from "../../secret";

const incidenceConsumer: any = {

    getAll: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/incidence/",
        })
    },
    getById: (data: any) => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/incidence/slot/" + data,
        })
    },
    createOne: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/incidence/",
            data: data
        })
    },
    deleteOne: (data: any) => {
        return Api({
            method: "delete",
            url: secret.DJANGO_APP_URL + "/incidence/" + data,
        })
    },
    deleteMany: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/incidence/deleteMany/",
            data: data
        })
    },
    updateOne: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/incidence/" + data.id,
            data: data.data
        })
    },
}

export default incidenceConsumer;