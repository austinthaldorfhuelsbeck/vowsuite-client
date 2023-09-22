// Dependencies
import * as React from "react"
import {
	useGalleryContext,
	useVideoContext,
} from "../../context/ContextProvider"

import { faPlus } from "@fortawesome/free-solid-svg-icons"
// Components
import { VideoList } from "../lists/VideoList"
import { InlineButton } from "../buttons/InlineButton"
import { VideoModal } from "../modals/VideoModal"
// Styles
import {
	ContentBlockContainer,
	ContentBlockHeader,
} from "../../styles/components/content-block.style"
import { NavBarContainer } from "../../styles/components/nav-bar.style"

export const GalleryEditor: React.FC = () => {
	const { gallery } = useGalleryContext()
	const { setVideo } = useVideoContext()
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		setVideo(undefined)
	}

	if (gallery === undefined)
		return <ContentBlockContainer></ContentBlockContainer>
	return (
		<ContentBlockContainer>
			<NavBarContainer>
				<ContentBlockHeader>{gallery.gallery_name}</ContentBlockHeader>
				<VideoModal>
					<InlineButton
						icon={faPlus}
						title="New Video"
						onClick={handleClick}
					/>
				</VideoModal>
			</NavBarContainer>
			<VideoList />
		</ContentBlockContainer>
	)
}
