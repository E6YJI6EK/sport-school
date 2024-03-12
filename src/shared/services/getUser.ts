import axios from "axios";
import { getToken } from "../lib/getToken";
import { DOMAIN } from "src/app/consts/consts";

export const getUser = async (id: string) => {
  try {
    const token = getToken();
    const response = await axios.get(`${DOMAIN}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.data.isSuccess) {
      return response.data.data;
    }
    if (response.data.isFailure) {
      throw new Error(response.data.message);
    }
  } catch (e) {
    return {
      // @ts-ignore
      message: e.message,
    };
  }
};
