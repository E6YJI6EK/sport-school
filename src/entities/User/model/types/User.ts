import { ResponseSchema } from "src/app/types/ResponseSchema";
import { formatDate } from "src/shared/lib/formatDate";
import { getGender } from "src/shared/lib/getGender";
import { getUserType } from "src/shared/lib/getUserType";
export interface UserState extends ResponseSchema {
  user: UserSchema;
  achievements: Achievement[];
}

export interface Achievement {
  description: string;
  date: string;
}

export interface jwtObject {
  id: string;
  name: string;
  last_name: string;
  patronymic: string;
  birthday_date: string;
  user_type: "coach" | "sportsman";
  gender: "male" | "female";
  contact_data: string;
  login: string;
  password: string;
  iat: number;
  exp: number;
}

export interface UserSchema {
  id?: string;
  name?: string;
  lastName?: string;
  patronymic?: string;
  birthdayDate?: string;
  userType?: "coach" | "sportsman";
  gender?: "male" | "female";
  contactData?: string;
  login?: string;
  authorized?: boolean;
}

export type UserType = "coach" | "sportsman" | "admin";

export class User {
  public id?: string;
  public name?: string;
  public lastName?: string;
  public patronymic?: string;
  public birthdayDate?: string | null;
  public userType?: string;
  public gender?: string;
  public contactData?: string;
  public login?: string;
  public authorized?: boolean;

  constructor(userData: UserSchema) {
    this.id = userData.id;
    this.name = userData.name;
    this.lastName = userData.lastName;
    this.patronymic = userData.patronymic;
    this.birthdayDate = formatDate(userData?.birthdayDate as string);
    this.userType = userData?.userType;
    this.gender = getGender(userData?.gender as "male" | "female");
    this.contactData = userData.contactData;
    this.login = userData.login;
    this.authorized = userData.authorized;
  }
}
