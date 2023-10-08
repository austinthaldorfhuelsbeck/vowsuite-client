// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import { FormProvider, useForm } from "react-hook-form"
// Data
import { IBaseGallery } from "../../interfaces/models"
import { initialGalleryData } from "../../data/initial-data"
import { copy } from "../../data/app-constants"
// Components
import { ControlInputGroup, InputGroup } from "./InputGroups"
// Styles
import {
	ModalFormActionsContainer,
	ModalForm,
	FormSuccess,
	FormError,
	ModalFormStyleContainer,
} from "../../styles/components/modal.style"
import {
	font_validation,
	gallery_name_validation,
	hex1_validation,
	hex2_validation,
	hex3_validation,
	img_URL_validation,
} from "../../utils/inputValidation"
import { InlineButton } from "../buttons/InlineButton"
import { IApiResponse } from "../../interfaces/api"
import { createGallery, updateGallery } from "../../services/galleries.service"

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
	const [error, setError] = React.useState<string | undefined>(undefined)
	// handlers
	const handleClear = () => {
		methods.reset(initialGalleryData)
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
					setUserMetadata({
						...userMetadata,
						galleries: response.data,
					})
				}
				// update gallery context
				setGallery({ ...formData, videos: [] })
				// update success banner
				setSuccess(true)
			}
			if (response.error) {
				// update error banner
				setError(response.error.message)
			}
		},
	)

	return (
		<FormProvider {...methods}>
			<ModalForm
				onSubmit={(e: any) => e.preventDefault()}
				noValidate
				autoComplete="off"
			>
				<InputGroup {...gallery_name_validation} />
				<InputGroup {...img_URL_validation} />
				<ControlInputGroup {...font_validation} />
				<ModalFormStyleContainer>
					<InputGroup {...hex1_validation} />
					<InputGroup {...hex2_validation} />
					<InputGroup {...hex3_validation} />
				</ModalFormStyleContainer>
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
