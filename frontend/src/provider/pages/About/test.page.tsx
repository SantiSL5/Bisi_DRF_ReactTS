import { useParams } from "react-router";

const Test = () => {
    const { id }: any = useParams();


    return (
        <span>{id}</span>
    );
}

export default Test;