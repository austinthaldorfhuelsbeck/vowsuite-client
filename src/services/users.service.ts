import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"

export const getUserByEmail = async (
    accessToken: string,
    email: string,
): Promise<IApiResponse> => {
    const apiUrl = process.env.REACT_APP_API_SERVER_URL

    const config: Axios.AxiosRequestConfig = {
        url: `${apiUrl}/users/?email=${email}`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    }

    const { data, error } = (await callExternalApi({ config })) as IApiResponse

    return {
        data,
        error,
    }
}