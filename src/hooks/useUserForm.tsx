import { ChangeEvent, SyntheticEvent, useState } from "react"

import { IBaseUser } from "../interfaces/models"
import { initialUserData } from "../data/initial-data"
import { useUserContext } from "../context/ContextProvider"
import { IApiResponse, IAppError } from "../interfaces/api"
import { createUser, updateUser } from "../services/vs-api/users.service"

function useUserForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
) {
	// context
	const { user, setUser } = useUserContext()
	// construct initial form data
	// in base user format (without galleries and company)
	const initialFormData: IBaseUser = user
		? {
				user_id: user.user_id,
				user_name: user.user_name,
				email: user.email,
				img_URL: user.img_URL,
				created_at: user.created_at,
				updated_at: new Date(),
		  }
		: initialUserData

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
		const response: IApiResponse = user?.company
			? await updateUser(formData)
			: await createUser(formData)
		if (response.data) {
			// update context
			if (user)
				setUser({
					...response.data,
					company: user.company,
					galleries: user.galleries,
				})
			// useStatus
			handleSuccess()
		}
		if (response.error) {
			// useStatus
			handleError(response.error)
		}
	}

	return { formData, setFormData, onChange, onReset, onSubmit }
}

export { useUserForm }
