import { AUTH_TOKEN_KEY } from "src/app/consts/consts";

export const setToken = (token:string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}