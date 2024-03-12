import { StateSchema } from "src/app/config/StateSchema";

export const getUserId = (state: StateSchema) => {
    return state?.UserState.user.id;
}