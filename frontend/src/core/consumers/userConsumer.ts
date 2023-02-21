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
}

export default userConsumer;