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
} from "../../styles/components/modal.style"
import { getGalleryResponse } from "../../services/get-response.service"
import {
	font_validation,
	gallery_name_validation,
	img_URL_validation,
} from "../../utils/inputValidation"
import { InlineButton } from "../buttons/InlineButton"
import { IApiResponse } from "../../interfaces/api"

export const GalleryForm: React.FC = () => {
	// load context
	const { userMetadata, setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	// determine initial form data from context
	let initialFormData: IBaseGallery = initialGalleryData
	if (userMetadata?.user_id) {
		if (gallery) {
			// load selected gallery and userID
			initialFormData = { ...gallery, user_id: userMetadata.user_id }
		} else {
			// load userID
			initialFormData = {
				...initialGalleryData,
				user_id: userMetadata.user_id,
			}
		}
	} else if (gallery) {
		// load selected gallery
		initialFormData = gallery
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
			const response: IApiResponse = await getGalleryResponse(
				formData,
				gallery?.gallery_id,
			)
			if (response.data) {
				// update user context
				if (userMetadata) {
					setUserMetadata({
						...userMetadata,
						// add gallery to list
						galleries: [
							...userMetadata.galleries,
							{ ...formData, videos: [] },
						],
					})
				}
				// update gallery context
				setGallery({ ...formData, videos: [] })
				// update success banner
				setSuccess(true)
				await new Promise(() => setTimeout(handleClear, 3000))
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
				{/* <img src={gallery?.img_URL} alt="Gallery Image" /> */}
				<InputGroup {...img_URL_validation} />
				<ControlInputGroup {...font_validation} />
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

	// return (
	// 	<ModalForm>
	// 		{/* <span>{`User ID: ${formData.user_id}`}</span> */}
	// 		<TextInputGroup
	// 			id="gallery_name"
	// 			title="Gallery Name"
	// 			maxLength={40}
	// 			onChange={handleChange}
	// 			value={formData.gallery_name}
	// 		/>
	// 		<TextInputGroup
	// 			id="img_URL"
	// 			title="Background Image URL"
	// 			maxLength={undefined}
	// 			onChange={handleChange}
	// 			value={formData.img_URL}
	// 		/>
	// 		<ControlGroup
	// 			id="font"
	// 			title="Font"
	// 			options={galleryFonts}
	// 			onChange={handleChange}
	// 			value={formData.font}
	// 		/>
	// 		<ModalFormStyleContainer>
	// 			<ColorTextInputGroup
	// 				id="hex1"
	// 				title="Color 1"
	// 				onChange={handleChange}
	// 				value={formData.hex1}
	// 			/>
	// 			<ColorTextInputGroup
	// 				id="hex2"
	// 				title="Color 2"
	// 				onChange={handleChange}
	// 				value={formData.hex2}
	// 			/>
	// 			<ColorTextInputGroup
	// 				id="hex3"
	// 				title="Color 3"
	// 				onChange={handleChange}
	// 				value={formData.hex3}
	// 			/>
	// 		</ModalFormStyleContainer>
	// 		<ModalFormActionsContainer>
	// 			<ClearButton onClear={handleClear} />
	// 			<GallerySubmitButton formData={formData} />
	// 		</ModalFormActionsContainer>
	// 	</ModalForm>
	// )
}
