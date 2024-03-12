import { ResponseSchema } from "src/app/types/ResponseSchema";

export interface SignUpSchema extends ResponseSchema {
  name: string;
  lastName: string;
  patronymic: string;
  birthdayDate: Date;
  userType: "coach" | "sportsman";
  gender: "male" | "female";
  contactData: string;
  login: string;
  password: string;
}
