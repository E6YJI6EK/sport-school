import axios from "axios";
import { getToken } from "../lib/getToken";
import { DOMAIN } from "src/app/consts/consts";

export const fetchCoaches = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${DOMAIN}/get-coaches`, {
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

export const getCoaches = async (setCoaches: (data: any) => void) => {
  const data = await fetchCoaches();
  setCoaches(data);
};
