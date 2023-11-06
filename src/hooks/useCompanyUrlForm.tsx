import { ChangeEvent, SyntheticEvent, useState } from "react"
import { IApiResponse, IAppError } from "../interfaces/api"
import { ICompanyUrl } from "../interfaces/models"
import { useUserContext } from "../context/ContextProvider"
import {
	createCompanyUrl,
	updateCompanyUrl,
} from "../services/vs-api/companies.service"

function useCompanyUrlForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
	initialData?: ICompanyUrl,
) {
	// Context
	const { user } = useUserContext()
	const blankFormData: ICompanyUrl = {
		company_url_id: new Date().valueOf(),
		company_id: user?.company?.company_id || 0,
		label: "",
		target: "",
		created_at: new Date(),
		updated_at: new Date(),
	}

	// State
	const [formData, setFormData] = useState<ICompanyUrl>(
		initialData || blankFormData,
	)

	// Handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onClear(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData({ ...blankFormData })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (initialData) setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = initialData
			? await updateCompanyUrl(formData, formData.company_url_id)
			: await createCompanyUrl(formData)
		if (response.data) {
			// update context
			handleSuccess()
		}
		if (response.error) {
			handleError(response.error)
		}
	}

	return { formData, setFormData, onChange, onClear, onReset, onSubmit }
}

export { useCompanyUrlForm }
