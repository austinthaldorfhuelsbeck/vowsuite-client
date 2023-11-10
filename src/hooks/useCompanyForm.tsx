import { ChangeEvent, SyntheticEvent, useState } from "react"
import { IBaseCompany, ICompany } from "../interfaces/models"
import { useUserContext } from "../context/ContextProvider"
import { initialCompanyData } from "../data/initial-data"
import { IApiResponse, IAppError } from "../interfaces/api"
import {
	createCompany,
	updateCompany,
} from "../services/vs-api/companies.service"

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
				// user_id: user.user_id,
		  }
		: {
				...initialCompanyData,
				user_id: user?.user_id || initialCompanyData.user_id,
				colors: [],
				urls: [],
		  }

	// state
	const [formData, setFormData] = useState<ICompany>(initialData)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// format request
		const {
			company_id,
			img_URL,
			user_id,
			company_name,
			font_id,
			created_at,
			updated_at,
		} = formData
		const request: IBaseCompany = {
			company_id,
			img_URL,
			user_id,
			company_name,
			font_id,
			created_at,
			updated_at,
		}
		// call API
		const response: IApiResponse = user?.company
			? await updateCompany(request)
			: await createCompany(request)
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

	return { formData, setFormData, onChange, onReset, onSubmit }
}

export { useCompanyForm }
