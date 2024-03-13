import { StateSchema } from "src/app/config/StateSchema";

export const getWorkoutsState = (state: StateSchema) => {
    return state?.WorkoutsState;
}