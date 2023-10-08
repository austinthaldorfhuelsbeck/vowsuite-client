// Dependencies
import * as React from "react"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { IApiResponse } from "../../../interfaces/api"
import { InlineButton } from "../InlineButton"
import {
	useGalleryContext,
	useUserContext,
} from "../../../context/ContextProvider"
import { deleteGallery } from "../../../services/galleries.service"

export const GalleryDeleteButton: React.FC = () => {
	// context
	const { setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()

	const handleDelete = (e: React.MouseEvent<HTMLLIElement>) => {
		e.preventDefault()
		// function to delete a video
		const getGalleryResponse = async (id: number) => {
			// API call
			const response: IApiResponse = await deleteGallery(id)
			// update context if response is successful
			if (response.data) {
				// gallery
				setGallery(undefined)
				// user
				console.log("response: ", response.data)
				setUserMetadata(response.data)
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
