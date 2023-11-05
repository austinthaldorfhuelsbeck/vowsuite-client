import { ChangeEvent, SyntheticEvent, useState } from "react"

import { ICompanyColor } from "../interfaces/models"
import { useUserContext } from "../context/ContextProvider"
import { IApiResponse, IAppError } from "../interfaces/api"
import {
	createCompanyColor,
	updateCompanyColor,
} from "../services/companies.service"

function useCompanyColorForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
	initialData?: ICompanyColor,
) {
	// Context
	const { user } = useUserContext()
	const blankFormData: ICompanyColor = {
		company_color_id: new Date().valueOf(),
		company_id: user?.company.company_id || 0,
		value: "#ffffff",
		created_at: new Date(),
		updated_at: new Date(),
	}

	// State
	const [formData, setFormData] = useState<ICompanyColor>(
		initialData || blankFormData,
	)

	// Handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (initialData) setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		// call API
		const response: IApiResponse = initialData
			? await updateCompanyColor(formData, formData.company_color_id)
			: await createCompanyColor(formData)
		if (response.data) {
			// update context
			handleSuccess()
		}
		if (response.error) {
			handleError(response.error)
		}
	}

	return { formData, onChange, onReset, onSubmit }
}

export { useCompanyColorForm }
