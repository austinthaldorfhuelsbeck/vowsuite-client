import React from "react"

import { IGallery } from "../../interfaces/models"
import { GalleryListItem } from "./GalleryListItem"
import { List } from "../../styles/components/lists.styles"
import { useUserContext } from "../../context/ContextProvider"

function GalleryList() {
	const { userMetadata } = useUserContext()

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
			{userMetadata?.galleries?.length ? (
				renderGalleries(userMetadata.galleries)
			) : (
				<></>
			)}
		</List>
	)
}

export { GalleryList }
