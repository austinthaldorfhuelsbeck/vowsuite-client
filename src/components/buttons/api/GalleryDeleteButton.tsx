import React, { MouseEvent } from "react"

import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { InlineButton } from "../InlineButton"
import { IGallery } from "../../../interfaces/models"
import { IApiResponse } from "../../../interfaces/api"
import { readUser } from "../../../services/users.service"
import { deleteGallery } from "../../../services/galleries.service"
import {
	useGalleryContext,
	useUserContext,
} from "../../../context/ContextProvider"

function GalleryDeleteButton() {
	// context
	const { setUserMetadata } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()

	const handleDelete = (e: MouseEvent<HTMLLIElement>) => {
		e.preventDefault()
		// function to delete a gallery
		const getGalleryResponse = async (gallery: IGallery) => {
			// API call
			const response: IApiResponse = await deleteGallery(
				gallery.gallery_id,
			)
			// update context if response is successful
			if (response.data) {
				// user
				setUserMetadata((await readUser(response.data.user_id)).data)
				// gallery
				setGallery(response.data)
			}
		}
		// call the async function on click if confirm
		if (gallery) getGalleryResponse(gallery)
	}

	return (
		<InlineButton
			onClick={handleDelete}
			icon={faTrash}
			title={`I understand this will delete ${gallery?.gallery_name}`}
		/>
	)
}

export { GalleryDeleteButton }
