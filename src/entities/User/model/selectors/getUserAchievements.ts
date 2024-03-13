import { StateSchema } from "src/app/config/StateSchema";

export const getUserAchievements = (state: StateSchema) => {
    return state?.UserState.achievements;
}