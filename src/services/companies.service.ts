import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"
import { ICompany } from "../interfaces/models"

export const createCompany = async (
	copmany: ICompany,
): Promise<IApiResponse> => {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/companies`,
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		data: copmany,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const updateCompany = async (
	copmany: ICompany,
	id: number,
): Promise<IApiResponse> => {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/companies/${id}`,
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		data: copmany,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}
