import { USER_DATA_KEY } from "src/app/consts/consts";

export const removeUserData = () => {
    localStorage.removeItem(USER_DATA_KEY);
}