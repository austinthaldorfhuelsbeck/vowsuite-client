import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"

// Config
const apiUrl: string = process.env.REACT_APP_CLOUDINARY_API_URL || ""
const apiKey: string = process.env.REACT_APP_CLOUDINARY_API_KEY || ""

// Components
async function uploadFileToCloudinary(file: File): Promise<IApiResponse> {
	const fileData = new FormData()
	fileData.append("file", file)
	fileData.append("upload_preset", "test-vowsuite-uploads-unsigned")
	fileData.append("api_key", apiKey)

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

export { uploadFileToCloudinary }
