// Dependencies
import * as React from "react"
import { useGalleryContext } from "../../context/ContextProvider"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
// Components
import { GalleryList } from "../lists/GalleryList"
import { Modal } from "../modals/Modal"
// Styles
import {
	GalleryContainer,
	GalleryContainerHeader,
} from "../../styles/layouts/dashboard-layout.style"
import { GalleryForm } from "../forms/GalleryForm"
import { InlineButton } from "../buttons/InlineButton"

export const Sidebar: React.FC = () => {
	// load context
	const { setGallery } = useGalleryContext()
	// handler
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
