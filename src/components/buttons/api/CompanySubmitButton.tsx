// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { useUserContext } from "../../../context/ContextProvider"
import {
	createCompany,
	updateCompany,
} from "../../../services/companies.service"
// Data
import { ICompany } from "../../../interfaces/models"
// Components
import { InlineButton } from "../InlineButton"
import { IApiResponse } from "../../../interfaces/api"

interface CompanySubmitButtonProps {
	formData: ICompany
	setError: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const CompanySubmitButton: React.FC<CompanySubmitButtonProps> = ({
	formData,
	setError,
}) => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// context
	const { userMetadata, setUserMetadata } = useUserContext()

	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault()
		// function to update or create a company
		// update or create depends on if company_id is undefined
		const getCompanyResponse = async (
			formData: ICompany,
			id: number | undefined,
		) => {
			const audienceURL = process.env.REACT_APP_AUTH0_AUDIENCE
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: audienceURL,
						scope: "read:current_user",
					},
				})
				// API call
				let response: IApiResponse = {
					data: null,
					error: null,
				}
				if (id) {
					response = await updateCompany(accessToken, formData, id)
				} else {
					response = await createCompany(accessToken, formData)
				}
				// update context/error based on response
				if (response?.data) {
					// user context
					if (userMetadata)
						setUserMetadata({ ...userMetadata, company: formData })
					// no error
					setError(undefined)
				} else if (response?.error) {
					// if error, set error
					setError(response.error.message)
				}
			} catch (error: any) {
				throw new Error(error)
			}
		}
		// call the async function on submit
		getCompanyResponse(formData, userMetadata?.company.company_id)
	}

	return (
		<InlineButton onClick={handleSubmit} icon={undefined} title="Submit" />
	)
}
