import { User, UserSchema } from "./model/types/User";
import { UserActions, UserReducer } from "./model/slice/UserSlice";
import { getUserState } from "./model/selectors/getUserState";
import { getUserLogin } from "./model/selectors/getUserLogin";
import { getUserName } from "./model/selectors/getUserName";
import { getUserResponseState } from "./model/selectors/getUserResponseState";
import { getUserId } from "./model/selectors/getUserId";
import { getUser } from "./model/services/getUser";
import { getUserType } from "./model/selectors/getUserType";
import { changePassword } from "./model/services/changePassword";
import { changeContactData } from "./model/services/changeContactData";
import { UserType } from "./model/types/User";

export {
  User,
  UserActions,
  UserReducer,
  getUserLogin,
  getUserName,
  getUserState,
  changeContactData,
  changePassword,
  getUserResponseState,
  getUserId,
  getUser,
  getUserType
};
export type { UserSchema, UserType };
