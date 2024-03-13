import { ResponseSchema } from "src/app/types/ResponseSchema";

export interface WorkoutsSchema extends ResponseSchema {
    list: Array<Workout>;
}

export interface Workout {
    name: string;
    beginDateTime: Date;
    endDateTime: Date;
    coach: string;
}