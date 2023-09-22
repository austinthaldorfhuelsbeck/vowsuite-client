// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import { IGallery } from "../../interfaces/models"
// Data
import { defaultGalleryStyle, imagePaths } from "../../utils/app-constants"
import {
	ModalFormActionsContainer,
	ModalFormCancel,
	ModalFormContainer,
	ModalFormInput,
} from "../../styles/components/modal.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { InlineButton } from "../buttons/InlineButton"

export const GalleryForm: React.FC = () => {
	const { userMetadata } = useUserContext()
	const { gallery } = useGalleryContext()

	// initial form data
	const userId = userMetadata ? userMetadata.user_id : 0
	const initialFormData: IGallery = {
		gallery_id: new Date().valueOf(),
		user_id: userId,
		gallery_name: "",
		img_URL: imagePaths.defaultUser,
		font: defaultGalleryStyle.font,
		hex1: defaultGalleryStyle.hex1,
		hex2: defaultGalleryStyle.hex2,
		hex3: defaultGalleryStyle.hex3,
		videos: [],
		created_at: new Date(),
		updated_at: new Date(),
	}
	// initial form state
	const [formData, setFormData] = React.useState<IGallery>(
		gallery || initialFormData,
	)
	React.useEffect(() => {
		if (gallery) {
			setFormData(gallery)
		} else {
			setFormData(initialFormData)
		}
		console.log(formData)
	}, [gallery])

	// event handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("Change Detected!")
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	return (
		<ModalFormContainer>
			<ModalFormCancel>
				<FontAwesomeIcon icon={faXmark} />
			</ModalFormCancel>
			<label>Name</label>
			<ModalFormInput
				type="text"
				name="gallery_name"
				placeholder="Gallery Name"
				maxLength={40}
				onChange={handleChange}
				value={formData.gallery_name}
			/>
			<hr />
			<label>Background Image URL</label>
			<ModalFormInput
				type="text"
				name="img_URL"
				placeholder="Paste URL here"
				onChange={handleChange}
				value={formData.img_URL}
			/>
			<hr />
			<label>Font</label>
			<ModalFormInput
				type="text"
				name="font"
				placeholder="Gallery Font"
				onChange={handleChange}
				value={formData.font}
			/>
			<hr />
			<label>Hex1</label>
			<ModalFormInput
				type="text"
				name="hex1"
				placeholder="Hex 1"
				onChange={handleChange}
				value={formData.hex1}
			/>
			<hr />
			<label>Hex2</label>
			<ModalFormInput
				type="text"
				name="hex2"
				placeholder="Hex 2"
				onChange={handleChange}
				value={formData.hex2}
			/>
			<hr />
			<label>Hex3</label>
			<ModalFormInput
				type="text"
				name="hex3"
				placeholder="Hex 3"
				onChange={handleChange}
				value={formData.hex3}
			/>
			<hr />
			<ModalFormActionsContainer>
				<InlineButton
					onClick={(e: any) => e.preventDefault()}
					icon={null}
					title="Submit"
				/>
			</ModalFormActionsContainer>
		</ModalFormContainer>
	)
}
