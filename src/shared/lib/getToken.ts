import { AUTH_TOKEN_KEY } from "src/app/consts/consts";

export const getToken = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY); 
    return token ? token : "";
}