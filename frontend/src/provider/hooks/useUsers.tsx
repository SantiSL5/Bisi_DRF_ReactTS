import consume from '../router/consumer';
import { useCallback, useEffect, useState } from 'react'
import { queryConsumer, userQueries, jwtQueries } from "../../core/queries";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { saveUser } from '../actions';
import { connect } from 'react-redux';

export function useUsers() {

    const navigate = useNavigate();
    const [user, setUser]: any = useState(undefined);
    const [token, setToken]: any = useState(consume(queryConsumer.apiJwt, jwtQueries.getToken));

    useEffect(() => {
        // console.log(consume(queryConsumer.apiJwt, jwtQueries.getToken));

        // consume(queryConsumer.apiJwt, jwtQueries.getToken).then((res: any) => { })

        // console.log(saveUser("actions"));

        // saveUser("actions");

        if (token) {
            consume(queryConsumer.apiUser, userQueries.getUser).then((res: any) => {

                setUser(res.data.user);
            }).catch((e: any) => {
                console.log(e);
            })
        }

        // if (token) {
        // const interval = setInterval(() => {
        //     if (sessionStorage.getItem("time")) {
        //         sessionStorage.setItem("time", Number(sessionStorage.getItem("time")) + Number(1))
        //         if (sessionStorage.getItem("time") >= 10) {
        //             refreshToken();
        //         }
        //     } else {
        //         sessionStorage.setItem("time", Number(1))
        //     }
        // }, 60000);


        // return () => clearInterval(interval);
        // }
    }, [token, setToken, user, setUser]);


    const registerH = ((data: any) => {
        consume(queryConsumer.apiUser, userQueries.register, data).then((res: any) => {
            setUser(res.data.user);
            setToken(res.data.token);
            consume(queryConsumer.apiJwt, jwtQueries.setToken, res.data.token);
            toast.success("User registered successfully, logging in...", { theme: "dark" })
            navigate('/');
        }).catch(() => {
            toast.error("Email is already taken", { theme: "dark" })
        })
    })

    const login = ((data: any) => {
        consume(queryConsumer.apiUser, userQueries.login, data).then((res: any) => {
            setUser(res.data.user);
            setToken(res.data.token);
            consume(queryConsumer.apiJwt, jwtQueries.setToken, res.data.token);
            toast.success("Logging in...", { theme: "dark" })
            navigate('/');
        }).catch(() => {
            toast.error("Wrong email or password", { theme: "dark" })
        })
    })

    const logout = (() => {
        setUser(null);
        setToken(null);
        consume(queryConsumer.apiJwt, jwtQueries.removeToken);
        // navigate('/');
    })

    const refreshToken = ((data: any) => {

    })

    return { user, token, registerH, login, logout, refreshToken };

}
