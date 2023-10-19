import React, { PropsWithChildren, useState } from "react"

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

type ComponentProps = {
	video: IVideo
}

function VideoCardListItem({ video }: PropsWithChildren<ComponentProps>) {
	// play button state
	const [isPlayButton, setIsPlayButton] = useState<boolean>(false)

	return (
		<Modal
			button={
				<CardImageContainer
					url={video.img_URL}
					onMouseOver={() => setIsPlayButton(true)}
					onMouseLeave={() => setIsPlayButton(false)}
				>
					<>
						{isPlayButton && (
							<CardPlayIcon>
								<FontAwesomeIcon icon={faPlay} />
							</CardPlayIcon>
						)}
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
					url={video.video_URL}
				/>
			}
		/>
	)
}

export { VideoCardListItem }
