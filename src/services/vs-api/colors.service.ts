import { AxiosRequestConfig } from "axios"

import { IApiResponse } from "../../interfaces/api"
import { callExternalApi } from "../external-api.service"

const apiUrl: string = process.env.REACT_APP_API_SERVER_URL || ""

async function readColor(id: number): Promise<IApiResponse> {
	const config: AxiosRequestConfig = {
		url: `${apiUrl}/colors/${id}`,
		method: "GET",
		headers: {
			"content-type": "application/json",
		},
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export { readColor }
