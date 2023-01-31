import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useForm } from 'react-hook-form';

interface IFormInputs {
    number: number,
    warning: boolean,
    disabled: boolean,
}

const List = ({ list }: any) => {

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<IFormInputs>({
        criteriaMode: "all"
    });

    const onSubmit = (data: IFormInputs) => {

        console.log(data);

    };


    return (
        <div className="container">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <label htmlFor="Number" className="form-label">Number:
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
                    <label className="form-check-label" htmlFor="warning">Warning</label>
                </div>

                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="disabled" {...register("disabled", {})} />
                    <label className="form-check-label" htmlFor="disabled">Disabled</label>
                </div>



                <input type="submit" />
            </form>

        </div>
    );
}

export default List;