import Api from "../api/api";
import secret from "../../secret";

const bikeConsumer: any = {

    getAll: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/bike/",
        })
    },
    createOne: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/bike/create/",
            data: data
        })
    },
    deleteOne: (data: any) => {
        return Api({
            method: "delete",
            url: secret.DJANGO_APP_URL + "/bike/" + data,
        })
    },
    deleteMany: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/bike/deleteMany/",
            data: data
        })
    },
    updateOne: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/bike/" + data.id,
            data: data.data
        })
    },
}

export default bikeConsumer;