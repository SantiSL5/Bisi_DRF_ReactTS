import { useEffect, useReducer, useState } from "react";
import consume from "../../router/consumer";
import { queryConsumer, userQueries } from "../../../core/queries";

const useRandomPokemon = (trigger: any) => {
    const [currentPoke, setPoke]: any = useState(undefined);

    useEffect(() => {
        const req = async () => {
            const res = await consume(queryConsumer.apiUser, userQueries.getRandom);
            setPoke(res);
        }

        req();

        return () => {
            setPoke(undefined);
        };
    }, [trigger])

    return currentPoke;
}

const PCBilly = (state: any, action: any) => {
    switch (action.type) {
        case "set":
            return state.includes(action.newPoke)
                ? state
                : [...state, action.newPoke]
        default:
            return state;
    }
};

const Gancho = () => {

    const [trigger, pullTrigger]: any = useState(0);

    const randomPokemon = useRandomPokemon(trigger);

    const [pokes, dispatch] = useReducer(PCBilly, []);

    useEffect(() => {
        if (randomPokemon) {
            // console.log(randomPokemon);
            const sprite = randomPokemon.data.sprites.front_default ?? randomPokemon.data.sprites.other["official-artwork"].front_default
            dispatch({ type: "set", newPoke: sprite })
        }
    }, [randomPokemon])

    return (
        <div>Gancho<br />
            <button type="button" onClick={() => { pullTrigger(Math.random()) }}>Pokamion</button>
            {
                pokes.map((e: any) => {
                    return <img src={e} alt="juan" key={e} height="100px"/>
                })
            }
        </div>
    );
}

export default Gancho;