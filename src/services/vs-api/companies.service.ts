import { IApiResponse } from "../../interfaces/api"
import { callExternalApi } from "../external-api.service"
import {
	IBaseCompany,
	ICompanyColor,
	ICompanyUrl,
} from "../../interfaces/models"
import { AxiosRequestConfig } from "axios"

const apiUrl: string = process.env.REACT_APP_API_SERVER_URL || ""

export const createCompany = async (
	company: IBaseCompany,
): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
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
	company: IBaseCompany,
): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
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

export const listCompanyUrls = async (id: number): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
		url: `${apiUrl}/companies/${id}/urls`,
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

export const updateCompanyUrl = async (
	url: ICompanyUrl,
	id: number,
): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
		url: `${apiUrl}/companies/urls/${id}`,
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		data: url,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const createCompanyUrl = async (
	url: ICompanyUrl,
): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
		url: `${apiUrl}/companies/${url.company_id}`,
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		data: url,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const listCompanyColors = async (id: number): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
		url: `${apiUrl}/companies/${id}/colors`,
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

export const updateCompanyColor = async (
	color: ICompanyColor,
	id: number,
): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
		url: `${apiUrl}/companies/colors/${id}`,
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		data: color,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const createCompanyColor = async (
	color: ICompanyColor,
): Promise<IApiResponse> => {
	const config: AxiosRequestConfig = {
		url: `${apiUrl}/companies/${color.company_id}`,
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		data: color,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}
