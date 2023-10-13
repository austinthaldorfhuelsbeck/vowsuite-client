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

interface VideoCardListItemProps {
	video: IVideo
}

export const VideoCardListItem: React.FC<VideoCardListItemProps> = ({
	video,
}) => {
	// play button state
	const [isDisplayed, setIsDisplayed] = React.useState<boolean>(false)

	return (
		<Modal
			button={
				<CardImageContainer
					url={video.img_URL}
					onMouseOver={() => setIsDisplayed(true)}
					onMouseLeave={() => setIsDisplayed(false)}
				>
					<>
						{isDisplayed && (
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
			content={<></>}
		/>
	)
}
