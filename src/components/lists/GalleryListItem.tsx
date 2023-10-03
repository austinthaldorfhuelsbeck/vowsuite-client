// Dependencies
import * as React from "react"
import { IGallery } from "../../interfaces/models"
import { useGalleryContext } from "../../context/ContextProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
// Styles
import { SelectorListItem } from "../../styles/components/lists.styles"
import { ButtonTitle } from "../../styles/components/buttons.style"
import { ContextMenu } from "../menus/ContextMenu"
import { galleryContextList, renderMenu } from "../../data/context-lists"

interface GalleryListItemProps {
	currentGallery: IGallery
}

export const GalleryListItem: React.FC<GalleryListItemProps> = ({
	currentGallery,
}) => {
	const { gallery, setGallery } = useGalleryContext()

	return (
		<SelectorListItem
			aria-selected={currentGallery === gallery}
			onClick={() => setGallery(currentGallery)}
		>
			<FontAwesomeIcon icon={faFolder} />
			<ButtonTitle>{currentGallery.gallery_name}</ButtonTitle>
			<ContextMenu>
				<>{renderMenu(galleryContextList)}</>
			</ContextMenu>
		</SelectorListItem>
	)
}
