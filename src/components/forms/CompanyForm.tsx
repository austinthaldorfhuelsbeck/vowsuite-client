// Dependencies
import * as React from "react"
import { useUserContext } from "../../context/ContextProvider"
// Data
import { ICompany } from "../../interfaces/models"
import { initialCompanyData } from "../../data/initial-data"
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
import { TextInputGroup } from "../input-groups/input-groups"
// Styles
import {
	FormSuccess,
	ModalForm,
	ModalFormActionsContainer,
} from "../../styles/components/modal.style"
import { FormProvider, useForm } from "react-hook-form"
import { InlineButton } from "../buttons/InlineButton"
import { copy } from "../../data/app-constants"

export const CompanyForm: React.FC = () => {
	// load context
	const { userMetadata } = useUserContext()
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

	// state and handlers
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = React.useState<boolean>(false)
	const handleClear = () => {
		methods.reset()
		setSuccess(false)
	}
	const handleSubmit = methods.handleSubmit((data: any) => {
		console.log(data)
		methods.reset()
		setSuccess(true)
	})

	return (
		<FormProvider {...methods}>
			<ModalForm
				onSubmit={(e: any) => e.preventDefault()}
				noValidate
				autoComplete="off"
			>
				<TextInputGroup {...company_name_validation} />
				<TextInputGroup {...img_URL_validation} />
				<TextInputGroup {...website_URL_validation} />
				<TextInputGroup {...youtube_URL_validation} />
				<TextInputGroup {...instagram_URL_validation} />
				<TextInputGroup {...facebook_URL_validation} />
				<TextInputGroup {...vimeo_URL_validation} />
				<TextInputGroup {...tiktok_URL_validation} />
				{success && <FormSuccess>{copy.formSuccess}</FormSuccess>}
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
