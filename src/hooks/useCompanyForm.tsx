import { useEffect } from "react"

import { useUserContext } from "src/context/ContextProvider"
import { initialCompanyData } from "src/data/initial-data"
import { IApiResponse } from "src/interfaces/api"
import { ICompany } from "src/interfaces/models"
import { createCompany, updateCompany } from "src/services/companies.service"
import { useForm } from "./useForm"

function useCompanyForm() {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	const {
		formData,
		setFormData,
		success,
		setSuccess,
		error,
		setError,
		onChange,
	} = useForm(initialCompanyData)

	// handlers
	const statusClear = () => {
		setSuccess(false)
		setError(undefined)
	}
	const onClear = () => {
		if (userMetadata) {
			setFormData({
				...initialCompanyData,
				user_id: userMetadata.user_id,
			})
		}
		statusClear()
	}
	const onReset = () => {
		if (userMetadata) {
			setFormData({
				...userMetadata.company,
				user_id: userMetadata.user_id,
			})
		}
		statusClear()
	}
	const onSubmit = async (formData: ICompany) => {
		// call API
		const response: IApiResponse = userMetadata?.company
			? await updateCompany({
					...formData,
					company_id: userMetadata.company.company_id,
			  })
			: await createCompany(formData)
		// returns a company
		if (response.data) {
			// update context
			if (userMetadata) {
				setUserMetadata({ ...userMetadata, company: response.data })
			}
			// update success banner
			setSuccess(true)
		}
		if (response.error) {
			setError(response.error)
		}
	}

	// load found company to form
	useEffect(() => {
		if (userMetadata) {
			if (userMetadata.company) {
				setFormData({
					...userMetadata.company,
					user_id: userMetadata.user_id,
				})
			} else {
				setFormData({
					...initialCompanyData,
					user_id: userMetadata.user_id,
				})
			}
		}
	}, [setFormData, userMetadata])

	return { formData, onChange, onClear, onReset, onSubmit, success, error }
}

export { useCompanyForm }
