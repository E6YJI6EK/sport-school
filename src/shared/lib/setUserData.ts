import { USER_DATA_KEY } from "src/app/consts/consts";
import { User } from "src/entities/User";

export const setUserData = (data: User) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
};
