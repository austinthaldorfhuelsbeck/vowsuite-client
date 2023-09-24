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
} from "../../styles/components/content-block.style"
import { Modal } from "../modals/Modal"
import { ContentContainer } from "../../styles/components/util.style"
import { ModalResource } from "../../interfaces/common"
import { videoContextList } from "../../data/context-lists"

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

	const renderMenu = (resources: ModalResource[]) =>
		resources.map((resource, index) => (
			<Modal
				key={index}
				button={resource.button}
				content={resource.content}
			/>
		))

	return (
		<ContentBlockListItem onClick={(e: any) => handleClick(e, video)}>
			<ContentBlockImg src={video.img_URL} alt={video.video_name} />
			<ContentBlockHeader>{video.video_name}</ContentBlockHeader>
			<ContentContainer>
				<ContentBlockSubheader>
					{`Updated - ${formatDate(video.updated_at)}`}
				</ContentBlockSubheader>
				<ContextMenu>
					<>{renderMenu(videoContextList)}</>
				</ContextMenu>
			</ContentContainer>
		</ContentBlockListItem>
	)
}
