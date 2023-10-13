// Dependencies
import * as React from "react"
import { IVideo } from "../../interfaces/models"
import {
	AltHeader,
	AltSubheader,
	CardImageContainer,
	CardPlayIcon,
} from "../../styles/layouts/gallery-layout.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { copy } from "../../data/app-constants"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { Modal } from "../menus/Modal"
import ReactPlayer from "react-player"

interface VideoCardListItemProps {
	video: IVideo
}

export const VideoCardListItem: React.FC<VideoCardListItemProps> = ({
	video,
}) => {
	// play button state
	const [isplayButton, setIsPlayButton] = React.useState<boolean>(false)

	return (
		<Modal
			button={
				<CardImageContainer
					url={video.img_URL}
					onMouseOver={() => setIsPlayButton(true)}
					onMouseLeave={() => setIsPlayButton(false)}
				>
					<>
						{isplayButton && (
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
