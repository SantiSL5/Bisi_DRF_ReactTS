import axios from "axios";

interface AxiosInterface {
    method: string,
    url: string,
    data?: any
}

const Api = ({ method, url, data }: AxiosInterface) => {
    try {
        return axios({
            method: method,
            url: url,
            data: data
        });
    } catch (e) {
        return e;
    }
};


export default Api;