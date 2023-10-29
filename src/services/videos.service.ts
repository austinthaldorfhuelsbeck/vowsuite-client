import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"
import { IVideo } from "../interfaces/models"

async function createVideo(video: IVideo): Promise<IApiResponse> {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/videos`,
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		data: video,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

async function updateVideo(video: IVideo): Promise<IApiResponse> {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/videos/${video.video_id}`,
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		data: video,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

async function deleteVideo(id: number): Promise<IApiResponse> {
	const apiUrl = process.env.REACT_APP_API_SERVER_URL

	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/videos/${id}`,
		method: "DELETE",
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

export { createVideo, updateVideo, deleteVideo }