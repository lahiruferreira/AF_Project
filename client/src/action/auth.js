import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOG_OUT
} from '../constants/constants';
import axios from 'axios';
import { setToken } from "../setToken";

export const loadUser = () => async dispatch => {
    if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
    }
    try{
        const response = await axios.get('http://localhost:4001/api/users');

        dispatch({
            type:LOAD_USER,
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:AUTH_ERROR,
            payload: e
        })
    }
}

export const registerUser = (firstName, lastName, email, password) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({firstName, lastName, email, password})
        const response = await axios.post('http://localhost:4001/api/users/register',body,config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        })

        dispatch(loadUser());

    }catch (e) {
        dispatch({
            type:REGISTER_FAIL,
            payload: e
        })
    }
}

export const loginUser = (email, password) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, password})
        const response = await axios.post('http://localhost:4001/api/users/login',body,config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        })

        dispatch(loadUser());

    }catch (e) {
        dispatch({
            type:LOGIN_FAIL,
            payload: e
        })
    }
}

export const logOut = () => async dispatch =>{
    dispatch({
        type:LOG_OUT,
    })
}

/*
 ****************************** ADMIN *******************************
 */

/*export const loadAdmin = () => async dispatch => {
    if(localStorage.getItem('token')){
        setToken(localStorage.getItem('token'));
    }
    try{
        const response = await axios.get('http://localhost:4001/api/admin');

        dispatch({
            type:LOAD_ADMIN,
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:AUTH_ERROR,
            payload: e
        })
    }
}


export const loginAdmin = (email, password) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, password})
        const response = await axios.post('http://localhost:4001/api/admin/login',body,config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        })

        dispatch(loadAdmin());

    }catch (e) {
        dispatch({
            type:LOGIN_FAIL,
            payload: e
        })
    }
}

export const logOutAdmin = () => async dispatch =>{
    dispatch({
        type:LOG_OUT,
    })
}*/

    