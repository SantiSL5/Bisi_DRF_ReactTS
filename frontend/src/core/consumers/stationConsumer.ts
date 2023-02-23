import Api from "../api/api";
import secret from "../../secret";

const stationConsumer: any = {

    getAll: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/station/",
        })
    },
    getAllWithSlots: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/station/slots",
        })
    },
    createOne: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/station/create/",
            data: data
        })
    },
    deleteOne: (data: any) => {
        return Api({
            method: "delete",
            url: secret.DJANGO_APP_URL + "/station/" + data,
        })
    },
    deleteMany: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/station/deleteMany/",
            data: data
        })
    },
    updateOne: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/station/" + data.id,
            data: data.data
        })
    },
}

export default stationConsumer;