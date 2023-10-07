// Dependencies
import * as React from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useAuth0 } from "@auth0/auth0-react"
import { IApiResponse } from "../../../interfaces/api"
import { InlineButton } from "../InlineButton"
import {
	useGalleryContext,
	useUserContext,
} from "../../../context/ContextProvider"
import { deleteGallery } from "../../../services/galleries.service"

export const GalleryDeleteButton: React.FC = () => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// context
	const { userMetadata, setUserMetadata } = useUserContext()
	const { gallery } = useGalleryContext()

	const handleDelete = (e: React.MouseEvent<HTMLLIElement>) => {
		e.preventDefault()
		// function to delete a video
		const getGalleryResponse = async (id: number) => {
			const audienceURL = process.env.REACT_APP_AUTH0_AUDIENCE
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: audienceURL,
						scope: "read:current_user",
					},
				})
				// API call
				const response: IApiResponse = await deleteGallery(
					accessToken,
					id,
				)
				// update context if response is successful
				if (response.data) {
					// galleries context
					if (userMetadata?.galleries)
						setUserMetadata({
							...userMetadata,
							galleries: [
								...userMetadata.galleries.filter(
									(g) => g?.gallery_id !== id,
								),
							],
						})
				}
			} catch (error: any) {
				throw new Error(error)
			}
		}
		// call the async function on click if confirm
		if (gallery) getGalleryResponse(gallery.gallery_id)
	}

	return (
		<InlineButton
			onClick={handleDelete}
			icon={faTrash}
			title={`I understand this will delete ${gallery?.gallery_name}`}
		/>
	)
}
