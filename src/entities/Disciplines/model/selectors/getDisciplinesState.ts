import { StateSchema } from "src/app/config/StateSchema";

export const getDisciplinesState = (state: StateSchema) => {
    return state?.DisciplineState;
}