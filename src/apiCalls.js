import axios from "axios"

const backendUrl=process.env.REACT_APP_BACKEND_URL

export const loginCall=async(userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    dispatch({type:"SOCKET_START"})
    try {
        const res=await axios.post(backendUrl+"auth/login",userCredentials)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    } catch (err) {
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
}