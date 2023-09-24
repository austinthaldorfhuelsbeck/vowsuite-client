// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import {
	useCompanyContext,
	useUserContext,
} from "../../context/ContextProvider"
import { createCompany, updateCompany } from "../../services/companies.service"
// Data
import { ICompany } from "../../interfaces/models"
// Components
import { InlineButton } from "./InlineButton"

interface CompanySubmitButtonProps {
	formData: ICompany
	handleClear: () => void
}

export const CompanySubmitButton: React.FC<CompanySubmitButtonProps> = ({
	formData,
	handleClear,
}) => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// context
	const { company, setCompany } = useCompanyContext()
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
				if (id) {
					await updateCompany(accessToken, formData, id)
				} else {
					await createCompany(accessToken, formData)
				}
				// update user context
				if (userMetadata)
					setUserMetadata({ ...userMetadata, company: formData })
				// update selected company context
				setCompany(formData)
				// clear form
				handleClear()
			} catch (error: any) {
				throw new Error(error)
				console.log(error)
			}
		}
		// call the async function on submit
		getCompanyResponse(formData, company?.company_id)
	}

	return <InlineButton onClick={handleSubmit} icon={null} title="Submit" />
}
