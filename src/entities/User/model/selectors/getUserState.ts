import { StateSchema } from "src/app/config/StateSchema";

export const getUserState = (state: StateSchema) => {
    return state?.UserState.user;
}