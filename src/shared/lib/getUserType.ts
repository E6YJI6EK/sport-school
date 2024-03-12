import { UserType } from "src/entities/User";
import { userTypes } from "../consts/userTypes"

export const getUserType = (key: UserType) => {
    return userTypes[key];
}