import userConsumer from "./userConsumer";
import bikeConsumer from "./bikeConsumer";
import stationConsumer from "./stationConsumer";
import slotConsumer from "./slotConsumer";

const consumers: any = {
    ApiUser: { ...userConsumer },
    ApiBike: { ...bikeConsumer },
    ApiSlot: { ...slotConsumer },
    ApiStation: { ...stationConsumer },
}

export default consumers;

