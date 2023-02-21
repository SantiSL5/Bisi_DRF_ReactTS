import userConsumer from "./userConsumer";
import bikeConsumer from "./bikeConsumer";
import stationConsumer from "./stationConsumer";
import slotConsumer from "./slotConsumer";
import jwtConsumer from "./jwtConsumer";
import rentConsumer from "./rentConsumer";

const consumers: any = {
    ApiUser: { ...userConsumer },
    ApiBike: { ...bikeConsumer },
    ApiSlot: { ...slotConsumer },
    ApiStation: { ...stationConsumer },
    ApiJwt: { ...jwtConsumer },
    ApiRent: { ...rentConsumer },
}

export default consumers;

