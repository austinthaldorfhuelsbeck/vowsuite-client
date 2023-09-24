// Dependencies
import * as React from "react"
import { IVideo } from "../../interfaces/models"
// Components
import { ContextMenu } from "../menus/ContextMenu"
// Styles
import {
	ContentBlockHeader,
	ContentBlockImg,
	ContentBlockListItem,
	ContentBlockSubheader,
} from "../../styles/components/content-block.style"
import { useVideoContext } from "../../context/ContextProvider"

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

	// format date nicely
	const updatedDate: string = new Date(video.updated_at).toLocaleDateString(
		"en-us",
		{
			year: "numeric",
			month: "short",
			day: "numeric",
		},
	)

	return (
		<ContentBlockListItem onClick={(e: any) => handleClick(e, video)}>
			<ContentBlockImg src={video.img_URL} alt={video.video_name} />
			<ContentBlockHeader>{video.video_name}</ContentBlockHeader>
			<ContentBlockSubheader>
				{`Updated - ${updatedDate}`}
			</ContentBlockSubheader>
			<ContextMenu>
				<span>Context is everything</span>
			</ContextMenu>
		</ContentBlockListItem>
	)
}
