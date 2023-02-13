import axios from "axios";
import consume from "../../provider/router/consumer";
import { jwtQueries, queryConsumer } from "../queries";

interface AxiosInterface {
    method: string,
    url: string,
    data?: any
}

const Api = ({ method, url, data }: AxiosInterface) => {
    const token = consume(queryConsumer.apiJwt, jwtQueries.getToken);

    if (token) {
        try {
            return axios({
                method: method,
                url: url,
                data: data,
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        } catch (e) {
            return e;
        }
    } else {
        try {
            return axios({
                method: method,
                url: url,
                data: data
            });
        } catch (e) {
            return e;
        }
    }
};


export default Api;