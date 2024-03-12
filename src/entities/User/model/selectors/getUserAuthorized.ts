import { StateSchema } from "src/app/config/StateSchema";

export const getUserAuthorized = (state: StateSchema) => {
    return state?.UserState.user.authorized;
}