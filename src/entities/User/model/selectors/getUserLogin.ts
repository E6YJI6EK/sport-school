import { StateSchema } from "src/app/config/StateSchema";

export const getUserLogin = (state: StateSchema) => {
    return state?.UserState.user.login?.trim();
}