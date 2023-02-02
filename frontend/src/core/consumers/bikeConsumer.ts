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
            url: secret.DJANGO_APP_URL + "/bike/",
            data: data
        })
    },
}

export default bikeConsumer;