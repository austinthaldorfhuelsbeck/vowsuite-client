import axios, * as Axios from "axios"
import { IApiResponse, IAppError } from "../interfaces/api"

export const callExternalApi = async (options: {
	config: Axios.AxiosRequestConfig
}): Promise<IApiResponse> => {
	try {
		const response: Axios.AxiosResponse = await axios(options.config)
		const { data } = response

		return {
			data,
			error: null,
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as Axios.AxiosError

			const { response } = axiosError

			let message = "http request failed"

			if (response && response.statusText) {
				message = response.statusText
			}

			if (axiosError.message) {
				message = axiosError.message
			}

			if (
				response &&
				response.data &&
				(response.data as IAppError).message
			) {
				message = (response.data as IAppError).message
			}

			return {
				data: null,
				error: {
					message,
				},
			}
		}

		return {
			data: null,
			error: {
				message: (error as Error).message,
			},
		}
	}
}
