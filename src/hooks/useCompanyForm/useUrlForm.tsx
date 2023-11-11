import { ChangeEvent, SyntheticEvent, useState } from "react"
import { IApiResponse } from "../../interfaces/api"
import { ICompanyUrl } from "../../interfaces/models"
import {
	createCompanyUrl,
	updateCompanyUrl,
} from "../../services/vs-api/companies.service"
import { useStatus } from "../useStatus"
import { useUserContext } from "../../context/ContextProvider"

function useUrlForm(url: ICompanyUrl) {
	// Context
	const { user } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()

	// State
	const [formData, setFormData] = useState<ICompanyUrl>(url)

	// Handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value, updated_at: new Date() })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (url) setFormData(url)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = user?.company?.urls[5]
			? await updateCompanyUrl(formData)
			: await createCompanyUrl(formData)
		if (response.data) {
			// update context
			handleSuccess()
		}
		if (response.error) {
			handleError(response.error)
		}
	}

	return { formData, onChange, onReset, onSubmit, success, error }
}

export { useUrlForm }
