import { AUTH_TOKEN_KEY } from "src/app/consts/consts";

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
}