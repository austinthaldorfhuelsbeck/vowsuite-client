// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import { FormProvider, useForm } from "react-hook-form"
// Data
import { IBaseGallery, IGallery } from "../../interfaces/models"
import { initialGalleryData } from "../../data/initial-data"
import { copy } from "../../data/app-constants"
// Components
import { ControlInputGroup, InputGroup } from "./InputGroups"
// Styles
import {
	FormActionsContainer,
	Form,
	FormStyleContainer,
} from "../../styles/components/modal.style"
import {
	font_validation,
	gallery_name_validation,
	hex1_validation,
	hex2_validation,
	hex3_validation,
	img_URL_validation,
} from "./utils/inputValidation"
import { InlineButton } from "../buttons/InlineButton"
import { IApiResponse, IAppError } from "../../interfaces/api"
import { createGallery, updateGallery } from "../../services/galleries.service"
import { Alert } from "../../styles/components/content.style"
import {
	faArrowAltCircleRight,
	faCancel,
	faRefresh,
} from "@fortawesome/free-solid-svg-icons"
import { readUser } from "../../services/users.service"

export const GalleryForm: React.FC = () => {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	// determine initial form data from context
	let initialFormData: IBaseGallery = initialGalleryData
	if (userMetadata) {
		if (gallery) {
			// load selected gallery and userID
			initialFormData = { ...gallery, user_id: userMetadata.user_id }
		} else {
			// load userID to initial data
			initialFormData = {
				...initialGalleryData,
				user_id: userMetadata.user_id,
			}
		}
	}

	// state
	const methods = useForm({ defaultValues: initialFormData })
	const [success, setSuccess] = React.useState<boolean>(false)
	const [error, setError] = React.useState<IAppError | undefined>(undefined)
	// handlers
	const handleClear = (data: IBaseGallery) => {
		methods.reset(data)
		setSuccess(false)
		setError(undefined)
	}
	const handleSubmit = methods.handleSubmit(
		async (formData: IBaseGallery) => {
			// call API
			const response: IApiResponse = gallery
				? await updateGallery(formData, gallery.gallery_id)
				: await createGallery(formData)
			if (response.data) {
				// update user context
				if (userMetadata) {
					setUserMetadata(
						(await readUser(response.data.user_id)).data,
					)
				}
				// update gallery context
				setGallery(response.data)
				// update success banner
				setSuccess(true)
				setTimeout(setSuccess, 3000, false)
			}
			if (response.error) {
				// update error banner
				setError(response.error)
				setTimeout(setError, 3000, undefined)
			}
		},
	)

	return (
		<FormProvider {...methods}>
			<Form
				onSubmit={(e: any) => e.preventDefault()}
				noValidate
				autoComplete="off"
			>
				<InputGroup {...gallery_name_validation} />
				<InputGroup {...img_URL_validation} />
				<ControlInputGroup {...font_validation} />
				<FormStyleContainer>
					<InputGroup {...hex1_validation} />
					<InputGroup {...hex2_validation} />
					<InputGroup {...hex3_validation} />
				</FormStyleContainer>
				{(success || error) && (
					<Alert error={error !== undefined}>
						{error ? error.message : copy.formSuccess}
					</Alert>
				)}
				<FormActionsContainer>
					{gallery && (
						<InlineButton
							icon={faRefresh}
							title="Reset"
							onClick={() => handleClear(initialFormData)}
						/>
					)}
					<InlineButton
						icon={faCancel}
						title="Clear"
						onClick={() => handleClear(initialGalleryData)}
					/>
					<InlineButton
						icon={faArrowAltCircleRight}
						title="Submit"
						onClick={handleSubmit}
					/>
				</FormActionsContainer>
			</Form>
		</FormProvider>
	)
}
