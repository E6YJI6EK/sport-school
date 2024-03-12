import { ResponseSchema } from "src/app/types/ResponseSchema";

export interface Discipline {
  name: string;
  userId: string;
}

export interface DisciplinesState extends ResponseSchema {
  list: Array<Discipline>;
}
