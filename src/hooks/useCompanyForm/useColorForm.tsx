import { ChangeEvent, SyntheticEvent, useState } from "react"

import { useStatus } from "../useStatus"
import { IApiResponse } from "../../interfaces/api"
import { ICompanyColor } from "../../interfaces/models"
import { useUserContext } from "../../context/ContextProvider"
import {
	createCompanyColor,
	updateCompanyColor,
} from "../../services/vs-api/companies.service"

function useCompanyColorForm(color: ICompanyColor) {
	// Context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()

	// State
	const [formData, setFormData] = useState<ICompanyColor>(color)

	// Handlers
	async function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value, updated_at: new Date() })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (color) setFormData(color)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		const response: IApiResponse = user?.company?.colors[2]
			? await updateCompanyColor(formData)
			: await createCompanyColor(formData)
		if (response.data) {
			handleSuccess()
		}
		if (response.error) {
			handleError(response.error)
		}
	}

	return { formData, onChange, onReset, onSubmit, success, error }
}

export { useCompanyColorForm }
