// Dependencies
import * as React from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { IApiResponse } from "../../../interfaces/api"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../../context/ContextProvider"
import { deleteVideo } from "../../../services/videos.service"
import { InlineButton } from "../InlineButton"
import { readUser } from "../../../services/users.service"

export const VideoDeleteButton: React.FC = () => {
	// context
	const { setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()

	const handleDelete = (e: React.MouseEvent<HTMLLIElement>) => {
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
				if (gallery) setGallery(response.data)
				// user
				const updatedUser = await readUser(response.data.user_id)
				if (updatedUser.data) setUserMetadata(updatedUser.data)
			}
		}
		// call the async function on click if confirm
		if (video) getVideoResponse(video.video_id)
	}

	return (
		<InlineButton
			onClick={handleDelete}
			icon={faTrash}
			title={`I understand this will delete ${video?.video_name}`}
		/>
	)
}
