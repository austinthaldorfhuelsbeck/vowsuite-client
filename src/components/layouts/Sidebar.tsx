// Dependencies
import * as React from "react"
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
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"

export const Sidebar: React.FC = () => {
	return (
		<GalleryContainer>
			<GalleryContainerHeader>Galleries</GalleryContainerHeader>
			<Modal
				button={
					<InlineButton
						icon={faFolderPlus}
						title="New Gallery"
						onClick={undefined}
					/>
				}
				content={<GalleryForm />}
			/>
			<GalleryList />
		</GalleryContainer>
	)
}
