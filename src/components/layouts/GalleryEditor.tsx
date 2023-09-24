// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useVideoContext,
} from "../../context/ContextProvider"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
// Components
import { GalleryNotFound } from "../static/GalleryNotFound"
import { InlineButton } from "../buttons/InlineButton"
import { VideoList } from "../lists/VideoList"
// Styles
import {
	ContentBlockContainer,
	ContentBlockHeader,
} from "../../styles/components/content-block.style"
import { NavBarContainer } from "../../styles/components/nav-bar.style"
import { Modal } from "../modals/Modal"
import { VideoForm } from "../forms/VideoForm"

export const GalleryEditor: React.FC = () => {
	const { gallery } = useGalleryContext()
	const { setVideo } = useVideoContext()
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		setVideo(undefined)
	}

	if (gallery === undefined)
		return (
			<ContentBlockContainer>
				<GalleryNotFound />
			</ContentBlockContainer>
		)
	return (
		<ContentBlockContainer>
			<NavBarContainer>
				<ContentBlockHeader>{gallery.gallery_name}</ContentBlockHeader>
				<Modal
					button={
						<InlineButton
							icon={faPlus}
							title="New Video"
							onClick={handleClick}
						/>
					}
					content={<VideoForm />}
				/>
			</NavBarContainer>
			<VideoList />
		</ContentBlockContainer>
	)
}
