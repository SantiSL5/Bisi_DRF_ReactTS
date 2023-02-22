import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';

interface IFormInputs {
    username: string,
    email: string,
    password: string,
    balance: number,
    img: string,
}

const CreateUpdate = ({ createUser, operation, updateData, updateUser, changeForm }: any) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<IFormInputs>({
        criteriaMode: "all"
    });

    if (updateData) {
        setValue("username", updateData.username)
        setValue("email", updateData.email)
        setValue("balance", updateData.balance)
        setValue("img", updateData.img)
    }

    if (operation === "create" && updateData !== undefined) {
        setValue("username", "")
        setValue("email", "")
        setValue("balance", 0)
        setValue("img", "https://static.productionready.io/images/smiley-cyrus.jpg")
        setValue("password", "")
    }


    const onSubmit = (data: IFormInputs) => {
        operation === "create" ? createUser(data) : updateUser({ data: data, id: updateData.id });
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="username" className="form-label text-white">Username:
                        <input id="username" type="text" className="form-control mt-2"
                            {...register("username", {
                                required: "This input is required.",
                                maxLength: {
                                    value: 32,
                                    message: "This input exceed maxLength."
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="username"
                            render={({ messages }) => {
                                console.log("messages", messages);
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </label>
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label text-white">Email:
                        <input id="email" type="text" className="form-control mt-2"
                            {...register("email", {
                                required: "This input is required.",
                                maxLength: {
                                    value: 32,
                                    message: "This input exceed maxLength."
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Entered value does not match email format"
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ messages }) => {
                                console.log("messages", messages);
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </label>
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="form-label text-white">Password:
                        <input id="password" type="text" className="form-control mt-2"
                            {...register("password", {
                                maxLength: {
                                    value: 32,
                                    message: "This input exceed maxLength."
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ messages }) => {
                                console.log("messages", messages);
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </label>
                </div>
                <div className="mb-2">
                    <label htmlFor="balance" className="form-label text-white">Balance:
                        <input id="balance" type="number" defaultValue="0" className="form-control mt-2"
                            {...register("balance", {
                                required: "This input is required.",
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="balance"
                            render={({ messages }) => {
                                console.log("messages", messages);
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </label>
                </div>
                <div className="mb-2">
                    <label htmlFor="img" className="form-label text-white">Image:
                        <input id="img" type="text" defaultValue="https://static.productionready.io/images/smiley-cyrus.jpg" className="form-control mt-2"
                            {...register("img", {
                                required: "This input is required.",
                                maxLength: {
                                    value: 256,
                                    message: "This input exceed maxLength."
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="img"
                            render={({ messages }) => {
                                console.log("messages", messages);
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </label>
                </div>


                {operation === "create"
                    ? <button type="submit" className="btn btn-success">Create</button>
                    : <div>
                        <button type="submit" className="btn btn-info">Update</button>
                        <button type="button" className="btn btn-success ms-3" onClick={
                            () => changeForm(null, "create")
                        }>Back to create</button>
                    </div>}
            </form>

        </div>
    );
}

export default CreateUpdate;