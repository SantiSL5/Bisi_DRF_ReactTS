//Api

const ApiUser: any = {
    get: () => {
        console.log('get');
        console.log(Consumers);

    },
    post: () => {
        console.log('post');

    }
}

// Queries

const ConsumersQuery: any = {
    userConsumer: "ApiUser",
    bikeConsumer: "ApiBike"
}

const Queries: any = {
    userGet: "get",
    userPost: "post"
}

// Consumer

const Consumers: any = {
    ApiUser: { ...ApiUser }
}

const consume = (Consumer: string, Query: string) => {
    return Consumers[ConsumersQuery[Consumer]][Queries[Query]]()

}

export default consume;