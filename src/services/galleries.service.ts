import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"
import { IBaseGallery } from "../interfaces/models"

export const addGallery = async (
	accessToken: string,
	gallery: IBaseGallery,
): Promise<IApiResponse> => {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/galleries`,
		method: "POST",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		data: gallery,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const updateGallery = async (
	accessToken: string,
	gallery: IBaseGallery,
	id: number,
): Promise<IApiResponse> => {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/galleries/${id}`,
		method: "PUT",
		headers: {
			"content-type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		data: gallery,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}
