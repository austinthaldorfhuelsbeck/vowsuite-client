// Dependencies
import * as React from "react"
import { IGallery } from "../../interfaces/models"
import { useGalleryContext } from "../../context/ContextProvider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faFolder, faLink } from "@fortawesome/free-solid-svg-icons"
// Styles
import {
	ContextListItem,
	SelectorListItem,
} from "../../styles/components/lists.styles"
import { ButtonTitle } from "../../styles/components/buttons.style"
import { ContextMenu } from "../menus/ContextMenu"
import { galleryContextList, renderMenu } from "../../data/context-lists"
import { HeaderStatusMessage } from "../../styles/layouts/gallery-layout.style"
import { baseUrls } from "../../data/app-constants"

interface GalleryListItemProps {
	currentGallery: IGallery
}

export const GalleryListItem: React.FC<GalleryListItemProps> = ({
	currentGallery,
}) => {
	const { gallery, setGallery } = useGalleryContext()
	// copy status state and handler
	const [success, setSuccess] = React.useState<boolean>(false)
	const onCopy = (e: React.MouseEvent<HTMLLIElement>) => {
		e.preventDefault()
		// function to copy text
		const copyText = async (text: string) => {
			try {
				await navigator.clipboard.writeText(text)
				setSuccess(true)
				setTimeout(setSuccess, 3000, false)
			} catch (err) {
				console.error("Failed to copy: ", err)
			}
		}
		if (gallery) copyText(`${baseUrls.galleryPage}/${gallery.gallery_id}`)
	}

	return (
		<SelectorListItem
			aria-selected={currentGallery === gallery}
			onClick={() => setGallery(currentGallery)}
		>
			<ButtonTitle>
				<FontAwesomeIcon icon={faFolder} />
				{" " + currentGallery.gallery_name}
			</ButtonTitle>
			<ContextMenu
				button={<FontAwesomeIcon icon={faEllipsis} />}
				content={
					<>
						{renderMenu(galleryContextList)}
						<ContextListItem onClick={onCopy}>
							<FontAwesomeIcon icon={faLink} />
							<ButtonTitle>Copy Link</ButtonTitle>
						</ContextListItem>
						{success && (
							<HeaderStatusMessage>
								Link copied!
							</HeaderStatusMessage>
						)}
					</>
				}
			/>
		</SelectorListItem>
	)
}
