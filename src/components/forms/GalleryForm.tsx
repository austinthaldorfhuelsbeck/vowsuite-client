// Dependencies
import * as React from "react"
import {
	useGalleriesContext,
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useAuth0 } from "@auth0/auth0-react"
import { addGallery, updateGallery } from "../../services/galleries.service"
// Data
import { IBaseGallery } from "../../interfaces/models"
import { initialGalleryData } from "../../utils/initial-data"
import { galleryFonts } from "../../utils/app-constants"
// Components
import { InlineButton } from "../buttons/InlineButton"
import {
	ColorInputGroup,
	ControlGroup,
	TextInputGroup,
} from "../input-groups/input-groups"
// Styles
import {
	ModalFormActionsContainer,
	ModalFormCancel,
	ModalForm,
	ModalFormStyleContainer,
} from "../../styles/components/modal.style"

// useModal passed down from GalleryModal
interface GalleryFormProps {
	toggle: () => void
}

export const GalleryForm: React.FC<GalleryFormProps> = ({ toggle }) => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// load context
	const { galleries, setGalleries } = useGalleriesContext()
	const { gallery, setGallery } = useGalleryContext()
	const { userMetadata } = useUserContext()
	// if current user, find user ID
	const userId = userMetadata ? userMetadata.user_id : 0

	// initial form state
	const [formData, setFormData] =
		React.useState<IBaseGallery>(initialGalleryData)
	React.useEffect(() => {
		// load gallery if it was found
		if (gallery) {
			setFormData(gallery)
		} else {
			// otherwise, load initial data
			setFormData(initialGalleryData)
		} // then add user ID
		setFormData({
			...formData,
			user_id: userId,
		})
	}, [gallery])

	// event handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setFormData(initialGalleryData)
		toggle()
	}
	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const getGalleryResponse = async (
			formData: IBaseGallery,
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
					await updateGallery(accessToken, formData, id)
				} else {
					await addGallery(accessToken, formData)
				}
				// update list context
				setGalleries([...galleries, { ...formData, videos: [] }])
				// update selected gallery context
				setGallery({ ...formData, videos: [] })
				// clear form and close modal
				setFormData(initialGalleryData)
				toggle()
			} catch (error: any) {
				throw new Error(error)
			}
		}
		// update or create
		getGalleryResponse(formData, gallery?.gallery_id)
	}

	return (
		<ModalForm>
			<ModalFormCancel onClick={handleCancel}>
				<FontAwesomeIcon icon={faXmark} />
			</ModalFormCancel>
			<TextInputGroup
				id="gallery_name"
				title="Gallery Name"
				maxLength={40}
				onChange={handleChange}
				value={formData.gallery_name}
			/>
			<TextInputGroup
				id="img_URL"
				title="Background Image URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.img_URL}
			/>
			<ControlGroup
				id="font"
				title="Font"
				options={galleryFonts}
				onChange={handleChange}
				value={formData.font}
			/>
			<ModalFormStyleContainer>
				<ColorInputGroup
					id="hex1"
					title="Color 1"
					onChange={handleChange}
					value={formData.hex1}
				/>
				<ColorInputGroup
					id="hex2"
					title="Color 2"
					onChange={handleChange}
					value={formData.hex2}
				/>
				<ColorInputGroup
					id="hex3"
					title="Color 3"
					onChange={handleChange}
					value={formData.hex3}
				/>
			</ModalFormStyleContainer>
			<ModalFormActionsContainer>
				<InlineButton
					onClick={handleSubmit}
					icon={null}
					title="Submit"
				/>
			</ModalFormActionsContainer>
		</ModalForm>
	)
}
