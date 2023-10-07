// Dependencies
import * as React from "react"
import { useUserContext } from "../../context/ContextProvider"
// Components
import { GalleryListItem } from "./GalleryListItem"
// Styles
import { List } from "../../styles/components/lists.styles"
import { IGallery } from "../../interfaces/models"

export const GalleryList: React.FC = () => {
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
