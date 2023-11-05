import { MouseEvent, PropsWithChildren } from "react"

import ReactPlayer from "react-player"

import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Modal } from "../menus/Modal"
import { IVideo } from "../../interfaces/models"
import { ContextMenu } from "../menus/ContextMenu"
import { VideosNotFound } from "../static/VideosNotFound"
import { List } from "../../styles/components/lists.styles"
import { formatDatePretty } from "../../services/util.service"
import {
	useGalleryContext,
	useVideoContext,
} from "../../context/ContextProvider"
import {
	renderModalContextMenu,
	videoContextList,
} from "../../data/modal-context-lists"
import {
	ContentContainer,
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
				<DashboardSubheader>
					{`Views - ${video.views}`}
				</DashboardSubheader>
				<DashboardSubheader>
					{`Downloads - ${video.downloads}`}
				</DashboardSubheader>
				<ContextMenu
					button={<FontAwesomeIcon icon={faEllipsis} />}
					content={<>{renderModalContextMenu(videoContextList)}</>}
				/>
			</ContentContainer>
		</DashboardListItem>
	)
}

function VideoList() {
	const { gallery } = useGalleryContext()

	if (!gallery?.videos || gallery?.videos.length === 0)
		return <VideosNotFound />
	return (
		<List>
			{gallery.videos.map((video: IVideo) => (
				<VideoListItem key={video.video_id} video={video} />
			))}
		</List>
	)
}

export { VideoList }
