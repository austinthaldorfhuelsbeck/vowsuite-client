// Dependencies
import * as React from "react"
import { IVideo } from "../../interfaces/models"
import { formatDate } from "../../services/util.service"
import { useVideoContext } from "../../context/ContextProvider"
// Components
import { ContextMenu } from "../menus/ContextMenu"
// Styles
import {
	ContentBlockHeader,
	ContentBlockImg,
	ContentBlockListItem,
	ContentBlockSubheader,
} from "../../styles/components/content.style"
import { ContentContainer } from "../../styles/components/util.style"
import { renderMenu, videoContextList } from "../../data/context-lists"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"

interface VideoListItemProps {
	video: IVideo
}

export const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
	// select the video and save to context on click
	const { setVideo } = useVideoContext()
	const handleClick = (e: React.MouseEvent<HTMLLIElement>, video: IVideo) => {
		e.preventDefault()
		setVideo(video)
	}

	return (
		<ContentBlockListItem onClick={(e: any) => handleClick(e, video)}>
			<ContentBlockImg src={video.img_URL} alt={video.video_name} />
			<ContentBlockHeader>{video.video_name}</ContentBlockHeader>
			<ContentContainer>
				<ContentBlockSubheader>
					{`Updated - ${formatDate(video.updated_at)}`}
				</ContentBlockSubheader>
				<ContextMenu
					button={<FontAwesomeIcon icon={faEllipsis} />}
					content={<>{renderMenu(videoContextList)}</>}
				/>
			</ContentContainer>
		</ContentBlockListItem>
	)
}
