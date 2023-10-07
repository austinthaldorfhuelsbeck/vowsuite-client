// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
// Data
import { IBaseGallery } from "../../interfaces/models"
import { initialGalleryData } from "../../data/initial-data"
import { galleryFonts } from "../../data/app-constants"
// Components
import { TextInputGroup } from "../input-groups/input-groups"
// Styles
import {
	ModalFormActionsContainer,
	ModalForm,
	ModalFormStyleContainer,
} from "../../styles/components/modal.style"
import { GallerySubmitButton } from "../buttons/api/GallerySubmitButton"

export const GalleryForm: React.FC = () => {
	// load context
	const { gallery } = useGalleryContext()
	const { userMetadata } = useUserContext()

	// create and set form state
	const [formData, setFormData] =
		React.useState<IBaseGallery>(initialGalleryData)
	React.useEffect(() => {
		if (gallery) {
			// load gallery data
			setFormData(gallery)
		} else {
			// if not found, load initial data again
			setFormData(initialGalleryData)
		} // then add user ID
		const userId: number | undefined = userMetadata
			? userMetadata.user_id
			: undefined
		if (userId)
			// user could theoretically be undefined
			setFormData({
				...formData,
				user_id: userId,
			})
	}, [gallery]) // do ^ every time the gallery is changed

	// event handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleClear = () =>
		setFormData(
			// tack on the user ID
			userMetadata?.user_id
				? { ...initialGalleryData, user_id: userMetadata.user_id }
				: initialGalleryData,
		)

	return <ModalForm></ModalForm>

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
	// 			<ColorInputGroup
	// 				id="hex1"
	// 				title="Color 1"
	// 				onChange={handleChange}
	// 				value={formData.hex1}
	// 			/>
	// 			<ColorInputGroup
	// 				id="hex2"
	// 				title="Color 2"
	// 				onChange={handleChange}
	// 				value={formData.hex2}
	// 			/>
	// 			<ColorInputGroup
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
