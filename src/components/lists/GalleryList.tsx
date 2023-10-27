import React from "react"

import { IGallery } from "../../interfaces/models"
import { GalleryListItem } from "./GalleryListItem"
import { List } from "../../styles/components/lists.styles"
import { useUserContext } from "../../context/ContextProvider"

function GalleryList() {
	const { user } = useUserContext()

	const renderGalleries = (galleries: IGallery[]) =>
		galleries.map(
			(currentGallery) =>
				currentGallery && (
					<GalleryListItem
						key={currentGallery.gallery_id}
						currentGallery={currentGallery}
					/>
				),
		)

	return (
		<List>
			{user?.galleries?.length ? renderGalleries(user.galleries) : <></>}
		</List>
	)
}

export { GalleryList }
