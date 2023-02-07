import Api from "../api/api";
import secret from "../../secret";

const slotConsumer: any = {

    getAll: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/slot/",
        })
    },
    createOne: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/slot/",
            data: data
        })
    },
    deleteOne: (data: any) => {
        return Api({
            method: "delete",
            url: secret.DJANGO_APP_URL + "/slot/" + data,
        })
    },
    deleteMany: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/slot/deleteMany/",
            data: data
        })
    },
    updateOne: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/slot/" + data.id,
            data: data.data
        })
    },
}

export default slotConsumer;