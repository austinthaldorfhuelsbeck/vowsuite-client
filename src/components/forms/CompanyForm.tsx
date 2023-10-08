// Dependencies
import * as React from "react"
import { useUserContext } from "../../context/ContextProvider"
import { FormProvider, useForm } from "react-hook-form"
import { getCompanyResponse } from "../../services/get-response.service"
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
} from "../../utils/inputValidation"
// Components
import { InputGroup } from "./InputGroups"
// Styles
import {
	FormError,
	FormSuccess,
	ModalForm,
	ModalFormActionsContainer,
} from "../../styles/components/modal.style"
import { InlineButton } from "../buttons/InlineButton"
import { IApiResponse } from "../../interfaces/api"

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
	const [error, setError] = React.useState<string | undefined>(undefined)
	// handlers
	const handleClear = () => {
		methods.reset(initialCompanyData)
		setSuccess(false)
		setError(undefined)
	}
	const handleSubmit = methods.handleSubmit(async (formData: ICompany) => {
		// call API
		const response: IApiResponse = await getCompanyResponse(
			formData,
			userMetadata?.company.company_id,
		)
		if (response.data) {
			// update context
			if (userMetadata) {
				setUserMetadata({ ...userMetadata, company: formData })
			}
			// update success banner
			setSuccess(true)
		}
		if (response.error) {
			// update error banner
			setError(response.error.message)
		}
	})

	return (
		<FormProvider {...methods}>
			<ModalForm
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
				{success && <FormSuccess>{copy.formSuccess}</FormSuccess>}
				{error && <FormError>{error}</FormError>}
				<ModalFormActionsContainer>
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
				</ModalFormActionsContainer>
			</ModalForm>
		</FormProvider>
	)
}
