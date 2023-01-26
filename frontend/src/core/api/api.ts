import axios from "axios";

const Api = {
    api(method: string, url: string, data: any) {
        try {
            return axios({
                method: method,
                url: url,
                data: data
            });
        } catch (e) {
            return e;
        }
    },
};

export default Api;