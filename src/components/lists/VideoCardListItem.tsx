import { PropsWithChildren, useEffect, useState } from "react"

import ReactPlayer from "react-player"

import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Modal } from "../menus/Modal"
import { copy } from "../../data/app-constants"
import { IVideo } from "../../interfaces/models"
import {
	AltHeader,
	AltSubheader,
	CardImageContainer,
	CardPlayIcon,
} from "../../styles/layouts/gallery-layout.style"
import { usePreview } from "../../hooks/usePreview"

interface ComponentProps {
	video: IVideo
}

function VideoCardListItem({ video }: PropsWithChildren<ComponentProps>) {
	// Context
	const imagePreview = usePreview()
	const videoPreview = usePreview()

	// Effects
	useEffect(() => {
		if (video.img_URL) imagePreview.getUrlFromAws(video.img_URL)
		if (video.video_URL) videoPreview.getUrlFromAws(video.video_URL)
	}, [imagePreview, video, videoPreview])

	return (
		<Modal
			button={
				<CardImageContainer
					url={imagePreview.validUrl || video.img_URL}
				>
					<>
						<CardPlayIcon>
							<FontAwesomeIcon icon={faPlay} />
						</CardPlayIcon>
						<AltHeader>{video.video_name}</AltHeader>
						<AltSubheader>
							<FontAwesomeIcon icon={faPlay} />
							{copy.videoCardSubheader}
						</AltSubheader>
					</>
				</CardImageContainer>
			}
			content={
				<ReactPlayer
					controls
					width={"80vw"}
					height={"100%"}
					url={videoPreview.validUrl || video.video_URL}
				/>
			}
		/>
	)
}

export { VideoCardListItem }
