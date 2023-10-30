import React, { MouseEvent } from "react"

import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { InlineButton } from "../InlineButton"
import { IApiResponse } from "../../../interfaces/api"
import { readUser } from "../../../services/users.service"
import { deleteVideo } from "../../../services/videos.service"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../../context/ContextProvider"

function VideoDeleteButton() {
	// context
	const { setUser } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()

	const handleDelete = (e: MouseEvent<HTMLLIElement>) => {
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
				if (updatedUser.data) setUser(updatedUser.data)
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

export { VideoDeleteButton }
