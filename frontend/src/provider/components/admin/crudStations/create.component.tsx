import { ErrorMessage } from "@hookform/error-message";
import { useForm } from 'react-hook-form';

interface IFormInputs {
    name: string,
    slots: string,
    warning: boolean,
    disabled: boolean,
}

const CreateUpdate = ({ createStation, operation, updateData, updateStation, changeForm }: any) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm<IFormInputs>({
        criteriaMode: "all"
    });

    if (updateData) {
        setValue("name", updateData.name)
        setValue("warning", updateData.warning)
        setValue("disabled", updateData.disabled)
    }

    if (operation === "create" && updateData !== undefined) {
        setValue("name", "")
        setValue("warning", false)
        setValue("disabled", false)
    }


    const onSubmit = (data: IFormInputs) => {
        operation === "create" ? createStation(data) : updateStation({ data: data, id: updateData.id });
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="Name" className="form-label text-white">Name:
                        <input id="Name" type="text" className="form-control mt-2"
                            {...register("name", {
                                required: "This input is required.",
                            })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="name"
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

                {(() => {
                    if (operation === "create") {
                        return <div className="mb-2">
                            <label htmlFor="Slots" className="form-label text-white">Number of Slots:
                                <input id="slots" type="number" className="form-control mt-2"
                                    {...register("slots", {
                                        maxLength: {
                                            value: 2,
                                            message: "This input exceed maxLength."
                                        }
                                    })}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="slots"
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
                    }
                })()}
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