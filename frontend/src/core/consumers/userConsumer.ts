import secrets from "../../secret";
import Api from "../api/api";

const userConsumer: any = {

    register: (data: any) => {
        return Api({
            method: "post",
            url: secrets.DJANGO_APP_URL + "/user/register/",
            data: data,
        })
    },
    login: (data: any) => {
        return Api({
            method: "post",
            url: secrets.DJANGO_APP_URL + "/user/login/",
            data: data,
        })
    },
    addFunds: (data: any) => {
        return Api({
            method: "put",
            url: secrets.DJANGO_APP_URL + "/user/addFunds",
            data: data,
        })
    },
    getUser: () => {
        return Api({
            method: "get",
            url: secrets.DJANGO_APP_URL + "/user/user",
        })
    },
    getAll: () => {
        return Api({
            method: "get",
            url: secrets.DJANGO_APP_URL + "/user/",
        })
    },
    create: (data: any) => {
        return Api({
            method: "post",
            url: secrets.DJANGO_APP_URL + "/user/",
            data: data,
        })
    },
    update: (data: any) => {
        return Api({
            method: "put",
            url: secrets.DJANGO_APP_URL + "/user/" + data.id,
            data: data,
        })
    },
    delete: (data: any) => {
        return Api({
            method: "delete",
            url: secrets.DJANGO_APP_URL + "/user/" + data,
            data: data,
        })
    },
    deleteMany: (data: any) => {
        return Api({
            method: "post",
            url: secrets.DJANGO_APP_URL + "/user/deleteMany/",
            data: data,
        })
    },
}

export default userConsumer;