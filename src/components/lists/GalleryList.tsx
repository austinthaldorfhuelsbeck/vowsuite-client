// Dependencies
import * as React from "react"
import { useGalleriesContext } from "../../context/ContextProvider"
// Components
import { GalleryListItem } from "./GalleryListItem"
// Styles
import { List } from "../../styles/components/lists.styles"

export const GalleryList: React.FC = () => {
	const { galleries } = useGalleriesContext()

	return (
		<List>
			{galleries.map(
				(currentGallery) =>
					currentGallery && (
						<GalleryListItem
							key={currentGallery.gallery_id}
							currentGallery={currentGallery}
						/>
					),
			)}
		</List>
	)
}
