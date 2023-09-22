// Dependencies
import * as React from "react"
import { Link } from "react-router-dom"
import { IVideo } from "../../interfaces/models"
// Styles
import {
	ContentBlockHeader,
	ContentBlockImg,
	ContentBlockListItem,
} from "../../styles/components/content-block.style"

interface VideoListItemProps {
	video: IVideo
}

export const VideoListItem: React.FC<VideoListItemProps> = ({ video }) => {
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
		<ContentBlockListItem>
			<Link to={`/studio/videos/${video.video_id}`}>
				<ContentBlockImg src={video.img_URL} alt={video.video_name} />
				<ContentBlockHeader>{video.video_name}</ContentBlockHeader>
				{`Updated - ${updatedDate}`}
			</Link>
		</ContentBlockListItem>
	)
}
