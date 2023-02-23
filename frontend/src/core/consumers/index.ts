import userConsumer from "./userConsumer";
import bikeConsumer from "./bikeConsumer";
import stationConsumer from "./stationConsumer";
import slotConsumer from "./slotConsumer";
import jwtConsumer from "./jwtConsumer";
import rentConsumer from "./rentConsumer";
import incidenceConsumer from "./incidenceConsumer";

const consumers: any = {
    ApiUser: { ...userConsumer },
    ApiBike: { ...bikeConsumer },
    ApiSlot: { ...slotConsumer },
    ApiStation: { ...stationConsumer },
    ApiJwt: { ...jwtConsumer },
    ApiRent: { ...rentConsumer },
    ApiIncidence: { ...incidenceConsumer },
}

export default consumers;

