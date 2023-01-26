// const Axios = (e: any) => {

// }

const ApiUser: any = {
    get: () => {
        console.log('get');

    },
    post: () => {
        console.log('post');

    }
}

const Consumers: any = {
    ApiUser: { ...ApiUser }
}

const ConsumersQuery: any = {
    userConsumer: "ApiUser"
}

const Queries: any = {
    userGet: "get",
    userPost: "post"
}

const consume = (Consumer: string, Query: string) => {
    return Consumers[ConsumersQuery[Consumer]][Queries[Query]]()

}

export default consume;