import { MouseEvent, PropsWithChildren } from "react"

import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { copy } from "../../data/app-constants"
import { IApiResponse } from "../../interfaces/api"
import { deleteGallery } from "../../services/vs-api/galleries.service"
import { FormContainer, FormRow } from "../../styles/components/forms.style"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../context/ContextProvider"
import {
	DashboardHeader,
	DashboardSubheader,
} from "../../styles/layouts/dashboard-layout.style"
import { deleteVideo } from "../../services/vs-api/videos.service"
import { TransparentButton } from "../../styles/components/buttons.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface ComponentProps {
	onDelete: (e: MouseEvent<HTMLButtonElement>) => void
}

function ConfirmDelete({ onDelete }: PropsWithChildren<ComponentProps>) {
	return (
		<>
			<DashboardHeader>{copy.confirmDeleteHeader}</DashboardHeader>
			<DashboardSubheader>{copy.confirmDeleteMessage}</DashboardSubheader>
			<FormRow>
				<TransparentButton onClick={onDelete}>
					<FontAwesomeIcon icon={faTrash} />
					{" I understand this action is permanent."}
				</TransparentButton>
			</FormRow>
		</>
	)
}

function GalleryDeleteForm() {
	// context
	const { user, setUser } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()

	const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		// function to delete a gallery
		const getGalleryResponse = async (id: number) => {
			// API call
			const response: IApiResponse = await deleteGallery(id)
			// update context if response is successful
			if (response.data) {
				// user
				if (user)
					setUser({
						...user,
						galleries: user.galleries.filter(
							(gallery) => gallery.gallery_id !== id,
						),
					})
				// gallery
				setGallery(undefined)
			}
		}
		// call the async function on click if confirm
		if (gallery) getGalleryResponse(gallery.gallery_id)
	}

	return (
		<FormContainer>
			<ConfirmDelete onDelete={onDelete} />
		</FormContainer>
	)
}

function VideoDeleteForm() {
	// context
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()

	const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		// function to delete a video
		const getVideoResponse = async (id: number) => {
			// API call
			const response: IApiResponse = await deleteVideo(id)
			// update context if response is successful
			if (response.data) {
				// video
				setVideo(undefined)
				// gallery
				if (gallery)
					setGallery({
						...gallery,
						videos: gallery.videos.filter((v) => v.video_id !== id),
					})
			}
		}
		// call the async function on click if confirm
		if (video) getVideoResponse(video.video_id)
	}

	return (
		<FormContainer>
			<ConfirmDelete onDelete={onDelete} />
		</FormContainer>
	)
}

export { GalleryDeleteForm, VideoDeleteForm }
