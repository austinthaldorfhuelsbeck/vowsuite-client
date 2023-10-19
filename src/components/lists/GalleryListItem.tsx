import React, { PropsWithChildren, useState, MouseEvent } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faFolder, faLink } from "@fortawesome/free-solid-svg-icons"

import { IGallery } from "../../interfaces/models"
import { ContextMenu } from "../menus/ContextMenu"
import { baseUrls } from "../../data/app-constants"
import { useGalleryContext } from "../../context/ContextProvider"
import { ButtonTitle } from "../../styles/components/buttons.style"
import { galleryContextList, renderMenu } from "../../data/context-lists"
import { HeaderStatusMessage } from "../../styles/layouts/gallery-layout.style"
import {
	ContextListItem,
	SelectorListItem,
} from "../../styles/components/lists.styles"

type ComponentProps = {
	currentGallery: IGallery
}

function GalleryListItem({
	currentGallery,
}: PropsWithChildren<ComponentProps>) {
	const { gallery, setGallery } = useGalleryContext()
	const [success, setSuccess] = useState<boolean>(false)

	const onCopy = (e: MouseEvent<HTMLLIElement>) => {
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

export { GalleryListItem }
