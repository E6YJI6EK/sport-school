import { Gender } from "../consts/gender"

export const getGender = (key: "male" | "female") => {
    return Gender[key];
}