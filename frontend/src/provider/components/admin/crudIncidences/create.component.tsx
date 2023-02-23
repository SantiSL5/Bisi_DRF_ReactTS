import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';

interface IFormInputs {
    message: string,
    slot: string,
    state: string,
}

const CreateUpdate = ({ createIncidence, operation, updateData, updateIncidence, changeForm }: any) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<IFormInputs>({
        criteriaMode: "all"
    });

    const onSubmit = (data: IFormInputs) => {
        operation === "create" ? createIncidence(data) : updateIncidence({ data: data, id: updateData.id });
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
                    <label htmlFor="slot" className="form-label text-white">Slot ID:
                        <input id="slot" type="number" className="form-control mt-2"
                            {...register("slot", {
                                required: "This input is required.",
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="slot"
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
                <div className="mb-4 mt-4 col-7 col-md-4 col-lg-2">
                    <select className="form-select" aria-label="Default select example" {...register("state", { required: true })}>
                        <option value="Pending">Pending</option>
                        <option value="On Process">On Process</option>
                        <option value="Solved">Solved</option>
                    </select >
                </div>


                <button type="submit" className="btn btn-success">Create</button>
            </form>

        </div>
    );
}

export default CreateUpdate;