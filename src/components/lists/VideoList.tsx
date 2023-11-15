import { MouseEvent, PropsWithChildren, useEffect } from "react"

import ReactPlayer from "react-player"

import { faEllipsis, faVideoSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Modal } from "../menus/Modal"
import { IVideo } from "../../interfaces/models"
import { ContextMenu } from "../menus/ContextMenu"
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
	DashboardBlock,
	DashboardCenterContent,
	DashboardHeader,
	DashboardImg,
	DashboardListItem,
	DashboardSubheader,
} from "../../styles/layouts/dashboard-layout.style"
import { copy, imagePaths } from "../../data/app-constants"
import { BigIcon } from "../../styles/components/util.style"
import { usePreview } from "../../hooks/usePreview"

interface ComponentProps {
	displayedVideo: IVideo
}

function VideoListItem({ displayedVideo }: PropsWithChildren<ComponentProps>) {
	// Context
	const { setVideo } = useVideoContext()
	const ImagePreview = usePreview()
	const VideoPreview = usePreview()

	// Effects
	// load image from aws
	useEffect(() => {
		ImagePreview.getUrlFromAws(displayedVideo.img_URL)
	}, [ImagePreview, displayedVideo])
	// load video from aws
	useEffect(() => {
		VideoPreview.getUrlFromAws(displayedVideo.video_URL)
	}, [VideoPreview, displayedVideo])

	// Handlers
	// select the video and save to context on click
	const handleClick = (e: MouseEvent<HTMLLIElement>, video: IVideo) => {
		e.preventDefault()
		setVideo(video)
	}

	return (
		<DashboardListItem onClick={(e: any) => handleClick(e, displayedVideo)}>
			<Modal
				button={
					<DashboardImg
						src={ImagePreview.validUrl || imagePaths.defaultUser}
						alt={displayedVideo.video_name}
					/>
				}
				content={
					<ReactPlayer
						controls
						width={"80vw"}
						height={"100%"}
						url={VideoPreview.validUrl}
					/>
				}
			/>
			<DashboardHeader>{displayedVideo.video_name}</DashboardHeader>
			<ContentContainer>
				<DashboardSubheader>
					{`Updated - ${formatDatePretty(displayedVideo.updated_at)}`}
				</DashboardSubheader>
				<DashboardSubheader>
					{`Views - ${displayedVideo.views}`}
				</DashboardSubheader>
				<DashboardSubheader>
					{`Downloads - ${displayedVideo.downloads}`}
				</DashboardSubheader>
				<ContextMenu
					button={<FontAwesomeIcon icon={faEllipsis} />}
					content={<>{renderModalContextMenu(videoContextList)}</>}
				/>
			</ContentContainer>
		</DashboardListItem>
	)
}

function VideosNotFound() {
	return (
		<DashboardBlock>
			<DashboardCenterContent>
				<BigIcon icon={faVideoSlash} />
				<DashboardSubheader>
					{copy.videosNotFoundSubheader}
				</DashboardSubheader>
			</DashboardCenterContent>
		</DashboardBlock>
	)
}

function VideoList() {
	const { gallery } = useGalleryContext()

	if (!gallery?.videos || gallery?.videos.length === 0)
		return <VideosNotFound />
	return (
		<List>
			{gallery.videos.map((video: IVideo) => (
				<VideoListItem key={video.video_id} displayedVideo={video} />
			))}
		</List>
	)
}

export { VideoList }
