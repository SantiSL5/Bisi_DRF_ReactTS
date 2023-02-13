import { useEffect, useState } from "react";
import CustomButton from "../../components/button.component";
import consume from "../../router/consumer";
import { queryConsumer, userQueries } from "../../../core/queries";
import RegisterForm from "../../components/login/register.component";
import LoginForm from "../../components/login/login.component";
import { useUsers } from "../../hooks/useUsers";


const Login = () => {
    const { registerH, login } = useUsers();
    const [op, setOp]: any = useState("register");

    const changeForm = (data: any, op: string) => {
        setOp(op);
    }
    return (
        <div className="container dflex justify-content-center text-center mt-5">
            <div className="continer mt-5">
                {op == "register" ? <button type="submit" className="btn btn-light" onClick={() => {
                        setOp("login")
                    }}>Go to Login</button> : <button type="submit" className="btn btn-light" onClick={() => {
                        setOp("register")
                    }}>Go to Register</button>}
            </div>
            {op == "register" ? <RegisterForm registerH={registerH}/> : <LoginForm login={login}/> }
        </div>
    );
}

export default Login;