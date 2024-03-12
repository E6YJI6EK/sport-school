import { StateSchema } from "src/app/config/StateSchema";

export const getUserName = (state: StateSchema) => {
    return [state?.UserState.user.name, state?.UserState.user.lastName].join(" ").trim();
}