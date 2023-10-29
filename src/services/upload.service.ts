import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"

async function uploadFile(fileData: FormData): Promise<IApiResponse> {
	const apiUrl: string = process.env.REACT_APP_CLOUDINARY_API_URL || ""

	const config: Axios.AxiosRequestConfig = {
		url: apiUrl,
		method: "POST",
		data: fileData,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export { uploadFile }
