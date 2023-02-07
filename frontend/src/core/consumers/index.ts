import userConsumer from "./userConsumer";
import bikeConsumer from "./bikeConsumer";
import stationConsumer from "./stationConsumer";

const consumers: any = {
    ApiUser: { ...userConsumer },
    ApiBike: { ...bikeConsumer },
    ApiStation: { ...stationConsumer },
}

export default consumers;

