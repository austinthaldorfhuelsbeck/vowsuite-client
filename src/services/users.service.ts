import * as Axios from "axios"
import { IApiResponse } from "../interfaces/api"
import { callExternalApi } from "./external-api.service"
import { IBaseUser, IUser } from "../interfaces/models"

const apiUrl = process.env.REACT_APP_API_SERVER_URL

export const getUser = async (id: number): Promise<IApiResponse> => {
	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/users/${id}`,
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

export const getUserByEmail = async (email: string): Promise<IApiResponse> => {
	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/users/?email=${email}`,
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

export const createUser = async (user: IBaseUser): Promise<IApiResponse> => {
	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/users`,
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		data: user,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}

export const updateUser = async (user: IBaseUser): Promise<IApiResponse> => {
	console.log("Data: ", user)
	const config: Axios.AxiosRequestConfig = {
		url: `${apiUrl}/users/${user.user_id}`,
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		data: user,
	}

	const { data, error } = (await callExternalApi({ config })) as IApiResponse

	return {
		data,
		error,
	}
}
