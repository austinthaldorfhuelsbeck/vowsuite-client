// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import {
	useGalleryContext,
	useVideoContext,
} from "../../context/ContextProvider"
import { createVideo, updateVideo } from "../../services/videos.service"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
// Data
import { IVideo } from "../../interfaces/models"
import { initialVideoData } from "../../utils/initial-data"
// Components
import { TextInputGroup } from "../input-groups/input-groups"
import { InlineButton } from "../buttons/InlineButton"
// Styles
import {
	ModalForm,
	ModalFormActionsContainer,
	ModalFormCancel,
} from "../../styles/components/modal.style"

// useModal passed down from VideoModal
interface VideoFormProps {
	toggle: () => void
}

export const VideoForm: React.FC<VideoFormProps> = ({ toggle }) => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// load context
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()
	// if current gallery, find gallery ID
	const galleryId: number = gallery ? gallery.gallery_id : 0

	const [formData, setFormData] = React.useState<IVideo>(
		video || initialVideoData,
	)
	React.useEffect(() => {
		// load video if it was found
		if (video) {
			console.log("Found ", video.video_name)
			setFormData({ ...video, gallery_id: galleryId })
			console.log("Form data: ", formData)
		} else {
			setFormData({ ...initialVideoData, gallery_id: galleryId })
		}
	}, [video])

	// event handlers
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}
	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setFormData(initialVideoData)
		toggle()
	}
	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const getVideoResponse = async (
			formData: IVideo,
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
					await updateVideo(accessToken, formData, id)
					// refresh to get update from API
					window.location.reload()
				} else {
					await createVideo(accessToken, formData)
					// update list context
					if (gallery)
						setGallery({
							...gallery,
							videos: [...gallery.videos, formData],
						})
				}
				// update selected video context
				setVideo(initialVideoData)
				// clear form and close modal
				setFormData(initialVideoData)
				toggle()
			} catch (error: any) {
				throw new Error(error)
			}
		}
		// update or create
		getVideoResponse(formData, video?.video_id)
	}

	return (
		<ModalForm>
			<ModalFormCancel onClick={handleCancel}>
				<FontAwesomeIcon icon={faXmark} />
			</ModalFormCancel>
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
				<InlineButton
					onClick={handleSubmit}
					icon={null}
					title="Submit"
				/>
			</ModalFormActionsContainer>
		</ModalForm>
	)
}
