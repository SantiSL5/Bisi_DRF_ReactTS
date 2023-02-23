import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';

interface IFormInputs {
    message: string,
    user: string,
}

const CreateUpdate = ({ createNotification, operation, updateData, updateNotification, changeForm }: any) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<IFormInputs>({
        criteriaMode: "all"
    });

    const onSubmit = (data: IFormInputs) => {
        operation === "create" ? createNotification(data) : updateNotification({ data: data, id: updateData.id });
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="message" className="form-label text-white">Message:
                        <input id="message" type="text" className="form-control mt-2"
                            {...register("message", {
                                required: "This input is required.",
                                minLength: {
                                    value: 4,
                                    message: "Too short."
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="message"
                            render={({ messages }) => {
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
                    <label htmlFor="user" className="form-label text-white">User ID:
                        <input id="user" type="number" className="form-control mt-2"
                            {...register("user", {
                                // required: "This input is required.",
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="user"
                            render={({ messages }) => {
                                return messages
                                    ? Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                    : null;
                            }}
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-success">Create</button>
            </form>

        </div>
    );
}

export default CreateUpdate;