// Dependencies
import * as React from "react"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
// Components
import { InlineButton } from "../buttons/InlineButton"
import { GalleryList } from "../lists/GalleryList"
import { GalleryModal } from "../modals/GalleryModal"
// Styles
import {
	GalleryContainer,
	GalleryContainerHeader,
} from "../../styles/layouts/dashboard-layout.style"
import { useGalleryContext } from "../../context/ContextProvider"

export const Sidebar: React.FC = () => {
	const { gallery, setGallery } = useGalleryContext()
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		setGallery(undefined)
	}
	return (
		<GalleryContainer>
			<GalleryContainerHeader>Galleries</GalleryContainerHeader>
			<GalleryModal>
				<InlineButton
					icon={faFolderPlus}
					title="New Gallery"
					onClick={handleClick}
				/>
			</GalleryModal>
			<GalleryList />
		</GalleryContainer>
	)
}
