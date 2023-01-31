import userConsumer from "./userConsumer";
import bikeConsumer from "./bikeConsumer";

const consumers: any = {
    ApiUser: { ...userConsumer },
    ApiBike: { ...bikeConsumer },
}

export default consumers;

