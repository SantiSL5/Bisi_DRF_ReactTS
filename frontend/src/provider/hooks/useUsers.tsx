import consume from '../router/consumer';
import JWTService from '../services/JWTService';
import { useCallback, useEffect, useState } from 'react'
import { queryConsumer, userQueries, jwtQueries } from "../../core/queries";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

export function useUsers() {

    const navigate = useNavigate();
    const [user, setUser]: any = useState();
    const [token, setToken]: any = useState();

    const registerH = useCallback((data: any) => {
        consume(queryConsumer.apiUser, userQueries.register, data).then((res: any) => {
            setUser(res.data.user);
            setToken(res.data.token);
            consume(queryConsumer.apiJwt, jwtQueries.setToken, res.data.token);
            toast.success("Logging in...", { theme: "dark" })
            navigate('/');
        }).catch(e => {
            console.log(e);
            // toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    }, [])

    const login = useCallback((data: any) => {
        consume(queryConsumer.apiUser, userQueries.login, data).then((res: any) => {
            setUser(res.data.user);
            setToken(res.data.token);
            consume(queryConsumer.apiJwt, jwtQueries.setToken, res.data.token);
            toast.success("User registered successfully, logging in...", { theme: "dark" })
            navigate('/');
        }).catch(e => {
            console.log(e);
            // toast.error(e.response.data.number[0].charAt(0).toUpperCase() + e.response.data.number[0].slice(1), { theme: "dark" })
        })
    }, [])

    const logout = (() => {
        setUser(null);
        setToken(null);
        consume(queryConsumer.apiJwt, jwtQueries.removeToken);
        // navigate('/');
    })

    const refreshToken = ((data: any) => {

    })

    return { user, registerH, login, logout, refreshToken };

}
