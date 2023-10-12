import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"
import { ICompany } from "../interfaces/models"

export const createCompany = async (
	company: ICompany,
): Promise<IApiResponse> => {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/companies`,
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		data: company,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const updateCompany = async (
	company: ICompany,
): Promise<IApiResponse> => {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/companies/${company.company_id}`,
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		data: company,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}
