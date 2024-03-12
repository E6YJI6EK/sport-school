import { StateSchema } from "src/app/config/StateSchema";

export const getDisciplinesList = (state: StateSchema) => {
    return state?.DisciplineState.list;
}