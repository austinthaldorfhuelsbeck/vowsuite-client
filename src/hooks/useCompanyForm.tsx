import { ChangeEvent, SyntheticEvent, useState } from "react"
import { ICompany } from "../interfaces/models"
import { useUserContext } from "../context/ContextProvider"
import { initialCompanyData } from "../data/initial-data"
import { IApiResponse, IAppError } from "../interfaces/api"
import { createCompany, updateCompany } from "../services/companies.service"

function useCompanyForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
) {
	// context
	const { user, setUser } = useUserContext()
	// determine initial form data
	const initialData: ICompany = user?.company
		? {
				...user.company,
				user_id: user.user_id,
		  }
		: {
				...initialCompanyData,
				user_id: user?.user_id || initialCompanyData.user_id,
		  }

	// state
	const [formData, setFormData] = useState<ICompany>(initialData)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onClear(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData({ ...initialCompanyData, user_id: initialData.user_id })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
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
			// useStatus
			handleError(response.error)
		}
	}

	return { formData, setFormData, onChange, onClear, onReset, onSubmit }
}

export { useCompanyForm }
