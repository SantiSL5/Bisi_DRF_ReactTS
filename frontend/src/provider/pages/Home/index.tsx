import { useEffect, useState } from "react";
import CustomButton from "../../components/button.component";
import consume from "../../router/consumer";
import { queryConsumer, userQueries } from "../../../core/queries";


const Home = () => {
    const [number, setNumber] = useState(0);
    const [bg, setBg] = useState("red");
    const [poke, setPoke] = useState(undefined);

    const handleClick = (action: "inc" | "dec") => {
        const actions = {
            inc: () => {
                setNumber((prevState) => {
                    return prevState + 1;
                })
            },
            dec: () => {
                let newNumber = number;
                setNumber(newNumber - 1)
            },
        }
        actions[action]()
    }

    const handleAction = async () => {
        const poke = await consume(queryConsumer.apiUser, userQueries.getUser)
        setPoke(poke.data.name);
    }

    useEffect(() => {
        // const colors = number % 2 === 0 ? "red" : "green";
        const colors = Math.floor(Math.random() * 16777215).toString(16);

        setBg(colors);
    }, [number])

    useEffect(() => {
        // console.log(poke);
    }, [poke])


    return (
        <div style={{
            background: "#" + bg
        }}>
            <CustomButton buttonName="incrementar" action={() => handleClick("inc")}></CustomButton>
            <CustomButton buttonName="decrementar" action={() => handleClick("dec")}></CustomButton>
            <CustomButton buttonName="accion" action={async () => await handleAction()}></CustomButton>
            <h1>{poke}</h1>
            {/* <button type="button" onClick={() => handleClick("inc")}>Incrementar</button> */}
            {/* <button type="button" onClick={() => handleClick("dec")}>Decrementar</button> */}
            <span>{number}</span>
        </div >
    );
}

export default Home;