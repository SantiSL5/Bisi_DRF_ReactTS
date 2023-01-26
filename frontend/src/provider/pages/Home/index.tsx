import { useEffect, useState } from "react";
import CustomButton from "../../components/button.component";
import consume from "../../../core/consumers";

const Home = () => {
    const [number, setNumber] = useState(0);
    const [bg, setBg] = useState("red");
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
    useEffect(() => {
        // const colors = number % 2 === 0 ? "red" : "green";
        const colors = Math.floor(Math.random() * 16777215).toString(16);
        console.log(colors);

        setBg(colors);
    }, [number])

    return (
        <div style={{
            background: "#" + bg
        }}>
            <CustomButton buttonName="incrementar" action={() => handleClick("inc")}></CustomButton>
            <CustomButton buttonName="decrementar" action={() => handleClick("dec")}></CustomButton>
            <CustomButton buttonName="accion" action={() => consume("userConsumer", "userGet")}></CustomButton>
            {/* <button type="button" onClick={() => handleClick("inc")}>Incrementar</button> */}
            {/* <button type="button" onClick={() => handleClick("dec")}>Decrementar</button> */}
            <span>{number}</span>
        </div>
    );
}

export default Home;