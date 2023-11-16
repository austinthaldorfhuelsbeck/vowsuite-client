import { ChangeEvent, SyntheticEvent, useState } from "react"

import { useStatus } from "./useStatus"
import { IApiResponse } from "../interfaces/api"
import { IBaseUser, IUser } from "../interfaces/models"
import { useUserContext } from "../context/ContextProvider"
import { updateUser } from "../services/vs-api/users.service"

function useUserForm(user: IUser | undefined) {
	// context
	const { setUser } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()

	// construct initial form data
	const initialFormData: IBaseUser = {
		user_id: user?.user_id || 0,
		user_name: user?.user_name || "",
		email: user?.email || "",
		img_URL: user?.img_URL || "",
		created_at: user?.created_at || new Date(),
		updated_at: new Date(),
	}

	// state
	const [formData, setFormData] = useState<IBaseUser>(initialFormData)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(initialFormData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = await updateUser(formData)

		if (response.data) {
			// update context
			setUser({
				...response.data,
				company: user?.company,
				galleries: user?.galleries,
			})
			// useStatus
			handleSuccess()
		}
		if (response.error) {
			// useStatus
			handleError(response.error)
		}
	}

	return {
		formData,
		setFormData,
		onChange,
		onReset,
		onSubmit,
		success,
		error,
	}
}

export { useUserForm }
