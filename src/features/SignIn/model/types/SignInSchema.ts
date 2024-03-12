import { ResponseSchema } from "src/app/types/ResponseSchema";

export interface SignInSchema extends ResponseSchema {
  login: string;
  password: string;
}
