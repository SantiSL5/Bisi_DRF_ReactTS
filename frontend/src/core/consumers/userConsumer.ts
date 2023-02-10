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
}

export default userConsumer;