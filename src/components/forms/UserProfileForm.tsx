// Dependencies
import * as React from "react"
import { useUserContext } from "../../context/ContextProvider"
import { IBaseUser } from "../../interfaces/models"
import { initialUserData } from "../../data/initial-data"
import { FormProvider, useForm } from "react-hook-form"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { createUser, updateUser } from "../../services/users.service"
import { Form, FormActionsContainer } from "../../styles/components/modal.style"
import { InputGroup } from "./InputGroups"
import {
	img_URL_validation,
	user_email_validation,
	user_name_validation,
} from "./utils/inputValidation"
import { Alert } from "../../styles/components/content.style"
import { copy } from "../../data/app-constants"
import { InlineButton } from "../buttons/InlineButton"
import {
	faArrowCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"

export const UserProfileForm: React.FC = () => {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	// determine initial form data from context
	const initialFormData: IBaseUser = userMetadata
		? {
				user_id: userMetadata.user_id,
				user_name: userMetadata.user_name,
				email: userMetadata.email,
				img_URL: userMetadata.img_URL,
				created_at: userMetadata.created_at,
				updated_at: userMetadata.updated_at,
		  }
		: initialUserData

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = React.useState<boolean>(false)
	const [error, setError] = React.useState<IAppError | undefined>(undefined)
	// handlers
	const handleClear = (data: IBaseUser) => {
		methods.reset(data)
		setSuccess(false)
		setError(undefined)
	}
	const handleSubmit = methods.handleSubmit(async (formData: IBaseUser) => {
		// call API
		const response: IApiResponse = userMetadata?.user_id
			? await updateUser(formData)
			: await createUser(formData)
		// returns a user
		if (response.data) {
			// update context
			console.log(response.data)
			if (userMetadata) setUserMetadata(response.data)
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
				<InputGroup {...user_name_validation} />
				<InputGroup {...user_email_validation} />
				<InputGroup {...img_URL_validation} />
				{(success || error) && (
					<Alert error={error !== undefined}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
				<FormActionsContainer>
					<InlineButton
						icon={faRefresh}
						title="Reset"
						onClick={() => handleClear(initialFormData)}
					/>
					<InlineButton
						icon={faCancel}
						title="Clear"
						onClick={() => handleClear(initialUserData)}
					/>
					<InlineButton
						icon={faArrowCircleRight}
						title="Submit"
						onClick={handleSubmit}
					/>
				</FormActionsContainer>
			</Form>
		</FormProvider>
	)
}
