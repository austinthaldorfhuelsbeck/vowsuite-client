// Dependencies
import * as React from "react"
import { IVideo } from "../../interfaces/models"
// Styles
import {
	ContentBlockHeader,
	ContentBlockImg,
	ContentBlockListItem,
	ContentBlockSubheader,
} from "../../styles/components/content-block.style"
import { useVideoContext } from "../../context/ContextProvider"
import { VideoModal } from "../modals/VideoModal"

interface VideoListItemProps {
	video: IVideo
}

export const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
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
			<VideoModal>
				<>
					<ContentBlockImg
						src={video.img_URL}
						alt={video.video_name}
					/>
					<ContentBlockHeader>{video.video_name}</ContentBlockHeader>
					<ContentBlockSubheader>
						{`Updated - ${updatedDate}`}
					</ContentBlockSubheader>
				</>
			</VideoModal>
		</ContentBlockListItem>
	)
}
