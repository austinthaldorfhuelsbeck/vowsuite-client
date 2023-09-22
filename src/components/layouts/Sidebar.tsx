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

export const Sidebar: React.FC = () => {
	return (
		<GalleryContainer>
			<GalleryContainerHeader>Galleries</GalleryContainerHeader>
			<GalleryModal>
				<InlineButton icon={faFolderPlus} title="New Gallery" />
			</GalleryModal>
			<GalleryList />
		</GalleryContainer>
	)
}
