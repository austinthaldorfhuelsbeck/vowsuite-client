import React, { MouseEvent } from "react"

import { faPlus } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { VideoList } from "../lists/VideoList"
import { VideoForm } from "../forms/VideoForm"
import { InlineButton } from "../buttons/InlineButton"
import { GalleryNotFound } from "../static/GalleryNotFound"
import { NavBarContainer } from "../../styles/components/nav-bar.style"
import {
	useGalleryContext,
	useVideoContext,
} from "../../context/ContextProvider"
import {
	ContentBlockContainer,
	ContentBlockHeader,
} from "../../styles/components/content.style"

function GalleryEditor() {
	const { gallery } = useGalleryContext()
	const { setVideo } = useVideoContext()
	const handleClick = (e: MouseEvent) => {
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

export { GalleryEditor }
