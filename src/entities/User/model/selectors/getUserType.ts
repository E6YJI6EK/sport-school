import { StateSchema } from "src/app/config/StateSchema";
import { UserType } from "../types/User";

export const getUserType = (state: StateSchema) => {
    return state?.UserState.user.userType;
}