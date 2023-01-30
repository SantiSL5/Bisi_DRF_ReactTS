import Api from "../api/api";

const userConsumer: any = {

    get: () => {
        return Api({
            method: "get",
            url: "https://pokeapi.co/api/v2/pokemon/ditto",
        })
    },
    getRandom: () => {
        const random = Math.floor(Math.random() * 1007) + 1;

        return Api({
            method: "get",
            url: "https://pokeapi.co/api/v2/pokemon/" + random,
        })
    },
    post: () => {
        console.log('post');

    }
}

export default userConsumer;