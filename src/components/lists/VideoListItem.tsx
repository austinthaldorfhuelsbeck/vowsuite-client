import React, { PropsWithChildren, MouseEvent } from "react"

import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { IVideo } from "../../interfaces/models"
import { ContextMenu } from "../menus/ContextMenu"
import { formatDatePretty } from "../../services/util.service"
import { useVideoContext } from "../../context/ContextProvider"
import { ContentContainer } from "../../styles/components/util.style"
import {
	renderModalContextMenu,
	videoContextList,
} from "../../data/context-lists"
import { Modal } from "../menus/Modal"
import ReactPlayer from "react-player"
import {
	DashboardHeader,
	DashboardImg,
	DashboardListItem,
	DashboardSubheader,
} from "../../styles/layouts/dashboard-layout.style"

interface ComponentProps {
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
		<DashboardListItem onClick={(e: any) => handleClick(e, video)}>
			<Modal
				button={
					<DashboardImg src={video.img_URL} alt={video.video_name} />
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
			<DashboardHeader>{video.video_name}</DashboardHeader>
			<ContentContainer>
				<DashboardSubheader>
					{`Updated - ${formatDatePretty(video.updated_at)}`}
				</DashboardSubheader>
				<ContextMenu
					button={<FontAwesomeIcon icon={faEllipsis} />}
					content={<>{renderModalContextMenu(videoContextList)}</>}
				/>
			</ContentContainer>
		</DashboardListItem>
	)
}

export { VideoListItem }
