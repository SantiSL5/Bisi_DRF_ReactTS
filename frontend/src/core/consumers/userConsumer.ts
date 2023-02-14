import consume from "../../provider/router/consumer";
import secrets from "../../secret";
import Api from "../api/api";
import { jwtQueries, queryConsumer } from "../queries";

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
    getUser: () => {
        return Api({
            method: "get",
            url: secrets.DJANGO_APP_URL + "/user/user",
        })
    },
    getUserType: () => {
        let isAdmin: boolean = true;

        if (consume(queryConsumer.apiJwt, jwtQueries.getToken)) {
            Api({
                method: "get",
                url: secrets.DJANGO_APP_URL + "/user/user",
            }).then((res: any) => {
                res.data.user.type === "admin" ? isAdmin = true : isAdmin = false
            }).catch(() => { })

            // console.log(isAdmin);

            return isAdmin;

        } else {
            return false;
        }
    },
}

export default userConsumer;