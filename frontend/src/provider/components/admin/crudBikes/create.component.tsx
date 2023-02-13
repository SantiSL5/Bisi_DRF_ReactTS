import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';

interface IFormInputs {
    number: number,
    warning: boolean,
    disabled: boolean,
}

const CreateUpdate = ({ createBike, operation, updateData, updateBike }: any) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<IFormInputs>({
        criteriaMode: "all"
    });

    if (updateData) {
        setValue("number", updateData.number)
        setValue("warning", updateData.warning)
        setValue("disabled", updateData.disabled)
    }

    const onSubmit = (data: IFormInputs) => {
        operation === "create" ? createBike(data) : updateBike({ data: data, id: updateData.id });
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="Number" className="form-label text-white">Number:
                        <input id="Number" type="number" className="form-control mt-2"
                            {...register("number", {
                                required: "This input is required.",
                                maxLength: {
                                    value: 4,
                                    message: "This input exceed maxLength."
                                }
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="number"
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

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="warning" {...register("warning", {})} />
                    <label className="form-check-label text-white" htmlFor="warning">Warning</label>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="disabled" {...register("disabled", {})} />
                    <label className="form-check-label text-white" htmlFor="disabled">Disabled</label>
                </div>

                {operation === "create"
                    ? <button type="submit" className="btn btn-success">Create</button>
                    : <button type="submit" className="btn btn-info">Update</button>}
            </form>

        </div>
    );
}

export default CreateUpdate;