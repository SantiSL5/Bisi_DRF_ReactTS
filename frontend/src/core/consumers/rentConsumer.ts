import Api from "../api/api";
import secret from "../../secret";

const rentConsumer: any = {

    rentBike: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/rent/",
            data: data
        })
    },
    rentInfo: () => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/rent/user",
        })
    },
    getUserRent: (data: any) => {
        return Api({
            method: "get",
            url: secret.DJANGO_APP_URL + "/rent/",
            data: data
        })
    },
    createOne: (data: any) => {
        return Api({
            method: "post",
            url: secret.DJANGO_APP_URL + "/rent/",
            data: data
        })
    },
    updateOne: (data: any) => {
        return Api({
            method: "put",
            url: secret.DJANGO_APP_URL + "/rent/" + data.id,
            data: data.data
        })
    },
}

export default rentConsumer;