import { ChangeEvent, SyntheticEvent, useState } from "react"
import { IBaseCompany } from "../../interfaces/models"
import { useUserContext } from "../../context/ContextProvider"
import { IApiResponse } from "../../interfaces/api"
import {
	createCompany,
	updateCompany,
} from "../../services/vs-api/companies.service"
import { useStatus } from "../useStatus"

function useBaseCompanyForm(baseCompany: IBaseCompany) {
	// context
	const { user, setUser } = useUserContext()
	const { success, error, handleSuccess, handleError } = useStatus()

	// state
	const [formData, setFormData] = useState<IBaseCompany>(baseCompany)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value, updated_at: new Date() })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(baseCompany)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// format request
		// call API
		const response: IApiResponse = user?.company
			? await updateCompany(formData)
			: await createCompany(formData)
		if (response.data) {
			// update context
			if (user) {
				setUser({ ...user, company: response.data })
			}
			// useStatus
			handleSuccess()
		}
		if (response.error) {
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

export { useBaseCompanyForm }
