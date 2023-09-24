// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useVideoContext,
} from "../../context/ContextProvider"
// Data
import { IVideo } from "../../interfaces/models"
import { initialVideoData } from "../../utils/initial-data"
// Components
import { TextInputGroup } from "../input-groups/input-groups"
import { ClearButton } from "../buttons/forms/ClearButton"
import { VideoSubmitButton } from "../buttons/forms/VideoSubmitButton"
// Styles
import {
	ModalForm,
	ModalFormActionsContainer,
} from "../../styles/components/modal.style"

export const VideoForm: React.FC = () => {
	// load context
	const { gallery } = useGalleryContext()
	const { video } = useVideoContext()

	// create and set form state
	// add the gallery ID if possible
	const [formData, setFormData] = React.useState<IVideo>(initialVideoData)
	React.useEffect(() => {
		if (video && gallery) {
			setFormData({ ...video, gallery_id: gallery.gallery_id })
		} else if (gallery) {
			setFormData({ ...initialVideoData, gallery_id: gallery.gallery_id })
		} else {
			setFormData(initialVideoData)
		}
	}, [video]) // do ^ every time the video is changed

	// event handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleClear = () =>
		setFormData(
			// tack on the gallery ID
			gallery?.gallery_id
				? { ...initialVideoData, gallery_id: gallery.gallery_id }
				: initialVideoData,
		)

	return (
		<ModalForm>
			<TextInputGroup
				id="video_name"
				title="Video Name"
				maxLength={40}
				onChange={handleChange}
				value={formData.video_name}
			/>
			<TextInputGroup
				id="video_URL"
				title="Video URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.video_URL}
			/>
			<TextInputGroup
				id="img_URL"
				title="Image URL"
				maxLength={undefined}
				onChange={handleChange}
				value={formData.img_URL}
			/>
			<ModalFormActionsContainer>
				<ClearButton onClear={handleClear} />
				<VideoSubmitButton formData={formData} />
			</ModalFormActionsContainer>
		</ModalForm>
	)
}
