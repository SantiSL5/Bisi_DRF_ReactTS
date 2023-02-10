import userConsumer from "./userConsumer";
import bikeConsumer from "./bikeConsumer";
import stationConsumer from "./stationConsumer";
import slotConsumer from "./slotConsumer";
import jwtConsumer from "./jwtConsumer";

const consumers: any = {
    ApiUser: { ...userConsumer },
    ApiBike: { ...bikeConsumer },
    ApiSlot: { ...slotConsumer },
    ApiStation: { ...stationConsumer },
    ApiJwt: { ...jwtConsumer },
}

export default consumers;

