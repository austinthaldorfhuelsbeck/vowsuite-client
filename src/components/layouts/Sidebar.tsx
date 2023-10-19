import React, { MouseEvent } from "react"

import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { GalleryList } from "../lists/GalleryList"
import { GalleryForm } from "../forms/GalleryForm"
import { InlineButton } from "../buttons/InlineButton"
import { useGalleryContext } from "../../context/ContextProvider"
import {
	GalleryContainer,
	GalleryContainerHeader,
} from "../../styles/layouts/dashboard-layout.style"

function Sidebar() {
	// load context
	const { setGallery } = useGalleryContext()
	// handler
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setGallery(undefined)
	}

	return (
		<GalleryContainer>
			<GalleryContainerHeader>Galleries</GalleryContainerHeader>
			<Modal
				button={
					<InlineButton
						icon={faFolderPlus}
						title="New Gallery"
						onClick={handleClick}
					/>
				}
				content={<GalleryForm />}
			/>
			<GalleryList />
		</GalleryContainer>
	)
}

export { Sidebar }
