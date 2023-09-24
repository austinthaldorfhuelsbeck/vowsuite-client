// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import {
	useGalleryContext,
	useVideoContext,
} from "../../../context/ContextProvider"
// Data
import { IVideo } from "../../../interfaces/models"
import { IApiResponse } from "../../../interfaces/api"
import { createVideo, updateVideo } from "../../../services/videos.service"
import { InlineButton } from "../InlineButton"

interface VideoSubmitButtonProps {
	formData: IVideo
}

export const VideoSubmitButton: React.FC<VideoSubmitButtonProps> = ({
	formData,
}) => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// context
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()

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
				let response: IApiResponse = {
					data: null,
					error: null,
				}
				if (id) {
					response = await updateVideo(accessToken, formData, id)
				} else {
					response = await createVideo(accessToken, formData)
				}
				// update context if response is successful
				if (response?.data) {
					// gallery context
					if (gallery)
						setGallery({
							...gallery,
							videos: [...gallery.videos, response.data],
						})
					// video context
					setVideo(response.data)
				}
			} catch (error: any) {
				throw new Error(error)
			}
		}
		// update or create
		getVideoResponse(formData, video?.video_id)
	}

	return <InlineButton onClick={handleSubmit} icon={null} title="Submit" />
}
