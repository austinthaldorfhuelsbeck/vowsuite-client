import React, { PropsWithChildren, MouseEvent } from "react"

import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { IVideo } from "../../interfaces/models"
import { ContextMenu } from "../menus/ContextMenu"
import { formatDate } from "../../services/util.service"
import { useVideoContext } from "../../context/ContextProvider"
import { ContentContainer } from "../../styles/components/util.style"
import { renderMenu, videoContextList } from "../../data/context-lists"
import {
	ContentBlockHeader,
	ContentBlockImg,
	ContentBlockListItem,
	ContentBlockSubheader,
} from "../../styles/components/content.style"

type ComponentProps = {
	video: IVideo
}

function VideoListItem({ video }: PropsWithChildren<ComponentProps>) {
	// select the video and save to context on click
	const { setVideo } = useVideoContext()
	const handleClick = (e: MouseEvent<HTMLLIElement>, video: IVideo) => {
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

export { VideoListItem }
