// Dependencies
import * as React from "react"
import { useUserContext } from "../../context/ContextProvider"
import { FormProvider, useForm } from "react-hook-form"
// Data
import { ICompany } from "../../interfaces/models"
import { initialCompanyData } from "../../data/initial-data"
import { copy } from "../../data/app-constants"
import {
	company_name_validation,
	img_URL_validation,
	website_URL_validation,
	youtube_URL_validation,
	instagram_URL_validation,
	facebook_URL_validation,
	vimeo_URL_validation,
	tiktok_URL_validation,
} from "./utils/inputValidation"
// Components
import { InputGroup } from "./InputGroups"
// Styles
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import { InlineButton } from "../buttons/InlineButton"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { Alert } from "../../styles/components/content.style"
import { createCompany, updateCompany } from "../../services/companies.service"

export const CompanyForm: React.FC = () => {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	// determine initial form data from context
	let initialFormData: ICompany = initialCompanyData
	if (userMetadata?.company && userMetadata?.user_id) {
		// load company data if the user has a company
		initialFormData = {
			...userMetadata.company,
			user_id: userMetadata.user_id,
		}
	} else if (userMetadata?.user_id) {
		// load initial company data if the user exists
		initialFormData = {
			...initialCompanyData,
			user_id: userMetadata.user_id,
		}
	}

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = React.useState<boolean>(false)
	const [error, setError] = React.useState<IAppError | undefined>(undefined)
	// handlers
	const handleClear = () => {
		methods.reset(initialCompanyData)
		setSuccess(false)
		setError(undefined)
	}
	const handleSubmit = methods.handleSubmit(async (formData: ICompany) => {
		// call API
		const response: IApiResponse = userMetadata?.company.company_id
			? await updateCompany(formData)
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
	})

	return (
		<FormProvider {...methods}>
			<Form
				onSubmit={(e: any) => e.preventDefault()}
				noValidate
				autoComplete="off"
			>
				<InputGroup {...company_name_validation} />
				<InputGroup {...img_URL_validation} />
				<InputGroup {...website_URL_validation} />
				<InputGroup {...youtube_URL_validation} />
				<InputGroup {...instagram_URL_validation} />
				<InputGroup {...facebook_URL_validation} />
				<InputGroup {...vimeo_URL_validation} />
				<InputGroup {...tiktok_URL_validation} />
				{(success || error) && (
					<Alert error={error !== undefined}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
				<FormActionsContainer>
					<InlineButton
						icon={undefined}
						title="Clear"
						onClick={handleClear}
					/>
					<InlineButton
						icon={undefined}
						title="Submit"
						onClick={handleSubmit}
					/>
				</FormActionsContainer>
			</Form>
		</FormProvider>
	)
}
