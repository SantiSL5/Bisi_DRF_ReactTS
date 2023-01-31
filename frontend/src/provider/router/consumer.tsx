import consumers from "../../core/consumers/index";


const consume = async (consumer: string, method: string, data?: any) => {    
    return await consumers[consumer][method](data);
}

export default consume;
