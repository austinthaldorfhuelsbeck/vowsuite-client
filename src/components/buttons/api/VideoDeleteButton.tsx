// Dependencies
import * as React from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useAuth0 } from "@auth0/auth0-react"
import { IApiResponse } from "../../../interfaces/api"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../../../context/ContextProvider"
import { deleteVideo } from "../../../services/videos.service"
import { InlineButton } from "../InlineButton"

export const VideoDeleteButton: React.FC = () => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// context
	const { userMetadata, setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()

	const handleDelete = (e: React.MouseEvent<HTMLLIElement>) => {
		e.preventDefault()
		// function to delete a video
		const getVideoResponse = async (id: number) => {
			const audienceURL = process.env.REACT_APP_AUTH0_AUDIENCE
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: audienceURL,
						scope: "read:current_user",
					},
				})
				// API call
				const response: IApiResponse = await deleteVideo(
					accessToken,
					id,
				)
				// update context if response is successful
				if (response.data) {
					// video context
					setVideo(undefined)
					// gallery context
					if (gallery) {
						setGallery({
							...gallery,
							videos: gallery.videos.filter(
								(v) => v.video_id !== id,
							),
						})
						// user context
						if (userMetadata)
							setUserMetadata({
								...userMetadata,
								galleries: [...userMetadata.galleries, gallery],
							})
					}
				}
			} catch (error: any) {
				throw new Error(error)
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
