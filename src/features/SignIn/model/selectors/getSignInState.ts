import { StateSchema } from "src/app/config/StateSchema";

export const getSignInState = (state: StateSchema) => {
    return state?.SignInSchema;
}