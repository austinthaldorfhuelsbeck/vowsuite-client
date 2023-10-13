import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"
import { IBaseGallery } from "../interfaces/models"

const apiUrl = process.env.REACT_APP_API_SERVER_URL
const config: Axios.AxiosRequestConfig = {
	headers: {
		"content-type": "application/json",
	},
}

export const createGallery = async (
	gallery: IBaseGallery,
): Promise<IApiResponse> => {
	config.url = `${apiUrl}/galleries`
	config.method = "POST"
	config.data = gallery

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const readGallery = async (id: string): Promise<IApiResponse> => {
	config.url = `${apiUrl}/galleries/${id}`
	config.method = "GET"

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const updateGallery = async (
	gallery: IBaseGallery,
	id: number,
): Promise<IApiResponse> => {
	// transform gallery data to the format
	// the API is expecting
	const updatedGallery = {
		gallery_id: gallery.gallery_id,
		user_id: gallery.user_id,
		gallery_name: gallery.gallery_name,
		img_URL: gallery.img_URL,
		hex1: gallery.hex1,
		hex2: gallery.hex2,
		hex3: gallery.hex3,
		updated_at: new Date(),
	}

	config.url = `${apiUrl}/galleries/${id}`
	config.method = "PUT"
	config.data = updatedGallery

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const deleteGallery = async (id: number): Promise<IApiResponse> => {
	config.url = `${apiUrl}/galleries/${id}`
	config.method = "DELETE"

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}
