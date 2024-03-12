import { StateSchema } from "src/app/config/StateSchema";
import { UserState } from "../types/User";

export const getUserResponseState = (state: StateSchema) => {
  return state?.UserState as Omit<UserState, "user">;
};
