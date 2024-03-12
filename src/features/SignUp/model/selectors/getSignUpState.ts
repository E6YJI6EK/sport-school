import { StateSchema } from "src/app/config/StateSchema";

export const getSignUpState = (state: StateSchema) => {
    return state?.SignUpSchema;
}